//Create a new map and colect information for the new layers
function layerLoader(){
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

  var url = document.getElementById('loader');
  if (url.value==""){
    alert("Empty URL");
    location.reload();
  }
  linkUrl = url.value;
  //var url = 'http://localhost:8080/geoserver/wms?service=wms&version=1.3.0&request=GetCapabilities';

  fetch(linkUrl).then(function(response) {
    return response.text();
  }).then(function(text) {
    var result = parser.read(text);
    //document.getElementById('log').innerText = JSON.stringify(result, null, 2);
    var nlayers = result.Capability.Layer.Layer.length;
    //i total position all layers
    //x position of the actual array
    //lastlayer rebember last position of last group of layers
    var i = lastlayer;
    var x = 0;
    while (i < (nlayers + lastlayer)) {
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


      customLayers[i] = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: linkUrl,
          params: {'LAYERS': ln[i]},
        })
      });
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
            center: [0, 0],
            zoom: 2
          })
        });
        for (var i = 0; i < customLayers.length-3; i++) {
          customLayers[i].setVisible(false);
        }

        defaultLayers = 3;
        map.on('pointermove', pointerMoveHandler);
        map.on('singleclick', clickEvents);
  });
}
