function layerLoader(){
  $('#WMSurl').modal('hide');
  var xhttp = new XMLHttpRequest();
  var badurl = false;
  var url = document.getElementById('loader');
  var linkUrl = url.value;

  if(linkUrl.indexOf('service') < 0){
    if(linkUrl.indexOf('?') < 0){
      linkUrl = linkUrl+'?service=wms&request=GetCapabilities';
    }else{
      linkUrl = linkUrl+'service=wms&request=GetCapabilities';
    }
  }

  if (isEmpty(url.value)){
    alert("Empty URL");
    return;
  }
  xhttp.open("GET", linkUrl);
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4){
      if(this.status == 200){
        var actualCenter = map.getView().getCenter();
        var actualZoom = map.getView().getZoom();
        //delete old map
        var elem = document.getElementById("map");
        elem.parentNode.removeChild(elem);
        source.clear();
        var div = document.createElement('div');
        div.id = "map";
        div.className = "map";
        div.style.height = "100%";
        div.Name = "remap";
        document.getElementById("group-maps").appendChild(div);
        modal.style.display = "none";
        //load new map
        var parser = new ol.format.WMSCapabilities();
        var ln = new Array();
        var result = parser.read(this.responseXML);
        //document.getElementById('log').innerText = JSON.stringify(result, null, 2);
        var nlayers = result.Capability.Layer.Layer.length;
        //i total position all layers
        //x position of the actual array
        //lastlayer rebember last position of last group of layers
        var i = lastlayer;
        var x = 0;
        while (i < (nlayers + lastlayer)) {
          layerCrs = result.Capability.Layer.Layer[x].BoundingBox[0].crs;
          ln[i] = result.Capability.Layer.Layer[x].Name;
          info[i] = [result.Capability.Layer.Layer[x].Title,
                     result.Capability.Layer.Layer[x].Name,
                     result.Capability.Layer.Layer[x].Abstract,
                     result.Service.ContactInformation.ContactPersonPrimary.ContactPerson,
                     result.Service.ContactInformation.ContactPersonPrimary.ContactOrganization,
                     result.Service.ContactInformation.ContactElectronicMailAddress,
                     result.Service.ContactInformation.ContactVoiceTelephone,
                     result.Service.AccessConstraints,
                     linkUrl,
                     linkUrl.substr(0, linkUrl.indexOf('?'))+"?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+result.Capability.Layer.Layer[x].Name];

            if((layerCrs != "EPSG:4326")&&(layerCrs != "CRS:84")){
              info[i].push(layerCrs);
              if (layerCrs == "EPSG:32628") {
                projec = new ol.proj.Projection({
                  code: layerCrs
                });
              }else{
                var newCRS = layerCrs.substr(layerCrs.indexOf(':')+1, layerCrs.length);
                var scriptUrl = "http://epsg.io/"+newCRS+".js";
                // con grafcan no funciona no se porque
                loadScript(scriptUrl, function(){
                  projec = new ol.proj.Projection({
                    code: layerCrs
                  });
                });
              }
              customLayers[i] = new ol.layer.Tile({
                source: new ol.source.TileWMS({
                  url: linkUrl,
                  params: {'LAYERS': ln[i]},
                  projection: projec
                })
              });
           }else{
             info[i].push("EPSG:3857");
             customLayers[i] = new ol.layer.Tile({
               source: new ol.source.TileWMS({
                 url: linkUrl,
                 params: {'LAYERS': ln[i]},
               })
             });
           }
          i++;
          x++;
        }
        var j = lastlayer;
        var collapmap = document.createElement('div');
        collapmap.innerHTML = '<p id="group_'+group_count+'" onclick="changeSymbol(this)" data-toggle="collapse" data-target="#op'+nmaps+'" style="cursor:pointer"><i id="symbol_'+group_count+'" class="glyphicon glyphicon-minus"></i> <u>'+result.Service.Title+'</u></p><div id="op'+nmaps+'" class="collapse in"></div>'
        document.getElementById("initialdiv").appendChild(collapmap);
        while (j < (nlayers + lastlayer)) {
          var hl = "<div style ='padding:10px;'><input id='layerVisibility"+j+"' onclick='Visibility(this)' type='checkbox'> Opacity "+info[j][0]+": <input id='customLayers"+j+"_opa' type='range' min='0' max='1' step='0.1' value='1' style='width:25%;display:inline-block' onchange='changeOpacity(this);'/><span id='customLayers"+j+"_res'>1</span> <a id='"+j+"'onclick=showInfo(this); style='cursor:pointer;' data-toggle='modal' data-target='#infoModal'>Information</a></div>";
          var div = document.createElement('div');
          div.innerHTML = hl;
          document.getElementById("op"+nmaps).appendChild(div);
          j++;
        }
        nmaps++;
        lastlayer = j;
        group_count++;

          customLayers.push(vector);
          customLayers.push(pipeline);
          customLayers.push(comments);
           map = new ol.Map({
              layers: [
                new ol.layer.Tile({
                  source: new ol.source.OSM()
                }), new ol.layer.Group({
                  layers: customLayers
                })
              ],
              target: 'map',
              view: new ol.View({
                center: actualCenter,
                zoom: actualZoom
              })
            });
            for (var i = 0; i < customLayers.length-3; i++) {
              if (!document.getElementById("layerVisibility"+i).checked){
                customLayers[i].setVisible(false);
              }
            }

            defaultLayers = 3;
            map.on('pointermove', pointerMoveHandler);
            map.on('singleclick', clickEvents);
            document.getElementById("collapse2").className = "panel-collapse collapse in";
      }
    }else{
      alert("Bad response from server: "+linkUrl+" " +
            this.statusText + ' (' +
            this.status + ')');
      return;
    }
  }
  xhttp.send();
}
