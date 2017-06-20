function checkLayers(){
  $('#WMSurl').modal('hide');
  var xhttp = new XMLHttpRequest();
  var url = document.getElementById('loader');
  linkUrl = url.value;

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
      if (this.status == 200){
        var parser = new ol.format.WMSCapabilities();
        var result = parser.read(this.responseXML);
        var nlayers = result.Capability.Layer.Layer.length;
        document.getElementById("nodeselection").innerHTML = "";
        $('#LayerSelection').modal('show');
        for (var i = 0; i < nlayers; i++) {
          var layersToSelect = document.createElement('div');
          layersToSelect.innerHTML = "<input name='layer_check' type='checkbox' value='"+i+"'>"+result.Capability.Layer.Layer[i].Title;
          document.getElementById("nodeselection").appendChild(layersToSelect);
        }
      }else{
        alert("Bad response from server: "+linkUrl+" " +
              this.statusText + ' (' +
              this.status + ')');
        return;
      }
    }
  }
  xhttp.send();
}

function layerLoader(){
  $('#LayerSelection').modal('hide');
  var xhttp = new XMLHttpRequest();
  var url = document.getElementById('loader');
  var sourceLink = linkUrl.substr(0, linkUrl.indexOf('?'));

  xhttp.open("GET", linkUrl);
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      var layer_check = document.getElementsByName("layer_check");
      Array.prototype.forEach.call(layer_check,function(lc){
        if(lc.checked){
          layersSelected.push(lc.value);
        }
      });
      if (customLayers.length >= 0){
        customLayers.splice(-3);
      }
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
      var i = 0;
      var x = 0;
      //var projec;
      t = lastlayer;

      var collapmap = document.createElement('div');
      collapmap.innerHTML = '<p id="group_'+group_count+'" onclick="changeSymbol(this)" data-toggle="collapse" data-target="#op'+nmaps+'" style="cursor:pointer"><i id="symbol_'+group_count+'" class="glyphicon glyphicon-minus"></i> <u>'+result.Service.Title+'</u></p><div id="op'+nmaps+'" class="collapse in"></div>'
      document.getElementById("initialdiv").appendChild(collapmap);

      while (i < nlayers) {
          if (i == layersSelected[x]){
          var format = result.Capability.Request.GetMap.Format[0];
          layerCrs = result.Capability.Layer.Layer[i].BoundingBox[0].crs;
          if (!layerCrs){
            alert("No tiene CRS");
            location.reload();
          }
          ln[t] = result.Capability.Layer.Layer[i].Name;
          info[t] = [result.Capability.Layer.Layer[i].Title,
                     result.Capability.Layer.Layer[i].Name,
                     result.Capability.Layer.Layer[i].Abstract,
                     result.Service.ContactInformation.ContactPersonPrimary.ContactPerson,
                     result.Service.ContactInformation.ContactPersonPrimary.ContactOrganization,
                     result.Service.ContactInformation.ContactElectronicMailAddress,
                     result.Service.ContactInformation.ContactVoiceTelephone,
                     result.Service.AccessConstraints,
                     linkUrl,
                     linkUrl.substr(0, linkUrl.indexOf('?'))+"?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+result.Capability.Layer.Layer[i].Name];

            if((layerCrs != "EPSG:4326")&&(layerCrs != "CRS:84")){
              info[t].push(layerCrs);
              if (layerCrs == "EPSG:32628") {
                projec = new ol.proj.Projection({
                  code: layerCrs
                });
              }else{
                if ((projections.indexOf(layerCrs)) < 0){
                  projections.push(layerCrs);
                  var newCRS = layerCrs.substr(layerCrs.indexOf(':')+1, layerCrs.length);
                  var scriptUrl = "http://epsg.io/"+newCRS+".js";
                  // con grafcan no funciona no se porque
                  loadScript(scriptUrl, function(){
                    projec = new ol.proj.Projection({
                      code: layerCrs
                    });
                  });
                }else{
                  projec = new ol.proj.Projection({
                    code: layerCrs
                  });
                }
              }
              customLayers[t] = new ol.layer.Tile({
                source: new ol.source.TileWMS({
                  url: sourceLink,
                  params: {'LAYERS': ln[t],
                           'FORMAT': format},
                  projection: projec
                })
              });
           }else{
             info[t].push("EPSG:3857");
             customLayers[t] = new ol.layer.Tile({
               source: new ol.source.TileWMS({
                 url: sourceLink,
                 params: {'LAYERS': ln[t],
                          'FORMAT': format},
               })
             });
           }
           var hl = "<div style ='padding:10px;'><input id='layerVisibility"+t+"' onclick='Visibility(this)' type='checkbox'>"+info[t][0]+"<div style='border:1px solid #9fc1ef;margin-left:18px;padding:5px;margin-right:-13px'>Opacity: <input id='customLayers"+t+"_opa' type='range' min='0' max='1' step='0.1' value='1' style='width:30%;display:inline-block;margin-bottom:-5px' onchange='changeOpacity(this);'/><span id='customLayers"+t+"_res'>1</span> <a id='"+t+"'onclick=showInfo(this); style='cursor:pointer;float:right' data-toggle='modal' data-target='#infoModal'>Information</a></div></div>";
           var div = document.createElement('div');
           div.innerHTML = hl;
           document.getElementById("op"+nmaps).appendChild(div);
           t++;
           x++;
         }
        i++;
      }
      nmaps++;
      lastlayer = t;
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
  }
  xhttp.send();
  layersSelected = [];
}
