//Load the map or layers in the web

//First check if the URL is ok, then get data of the web source.
//And the user select the layers he want to show on the map
function checkLayers(){
  //Hide the modal where the user put the url and check if the input is ok
  $('#WMSurl').modal('hide');
  var xhttp = new XMLHttpRequest();
  var url = document.getElementById('loader');
  if (isEmpty(url.value)){
    alert("Empty URL");
    return;
  }

  //The link can have 3 diferent case
  var linkUrl = url.value;
  linkUrl = linkUrl.trim();
  if(linkUrl.indexOf('request') < 0){
    //If there no the string 'request' means we need to put it
    if(linkUrl.indexOf('?') < 0){
      //May be '?' or not
      linkUrl = linkUrl+'?service=wms&request=GetCapabilities';
    }else{
      //Case url does not need '?'
      linkUrl = linkUrl+'service=wms&request=GetCapabilities';
    }
  }// else the url does not need changes

  xhttp.onreadystatechange = function(){
    if (this.readyState == 4){
      if (this.status == 200){
        //When the request is ready
        var parser = new ol.format.WMSCapabilities();
        result = parser.read(this.responseXML);
        //nlayers, number of the layers in the service
        var nlayers = result.Capability.Layer.Layer.length;
        document.getElementById("nodeselection").innerHTML = "";
        for (var i = 0; i < nlayers; i++) {
          var layersToSelect = document.createElement('div');
          layersToSelect.innerHTML = "<input name='layer_check' type='checkbox' value='"+i+"'>"+result.Capability.Layer.Layer[i].Title;
          document.getElementById("nodeselection").appendChild(layersToSelect);
        }
        //Show the modal with all layers to check
        $('#LayerSelection').modal('show');
      }else{
        //If error show the type and return the function
        alert("Bad response from server: "+linkUrl+" " +
              this.statusText + ' (' +
              this.status + ')');
        return;
      }
    }
  }
  xhttp.open("GET", linkUrl, true);
  xhttp.send();
}

//Put the data in a new map with all layers options
function layerLoader(){
  $('#LayerSelection').modal('hide');
  var url = document.getElementById('loader');
  var linkUrl = url.value;
  url.value = ""; //Clear the link form
  var sourceLink = linkUrl.substr(0, linkUrl.indexOf('?'));
  var layer_check = document.getElementsByName("layer_check");
  //Get layers selected by the user in array,
  //it has to be a push because may be spaces
  Array.prototype.forEach.call(layer_check,function(lc){
    if(lc.checked){
      layersSelected.push(lc.value);
    }
  });
  //If customLayers is not empty, means the last 3 layers are vector, pipeline and comments
  //delete it so that they do not interfere in the process
  if (customLayers.length > 0){
    customLayers.splice(-8);
  }
  //Get the view and zoom of the actual map
  //doing this the user experience is improved
  var actualCenter = map.getView().getCenter();
  var actualZoom = map.getView().getZoom();
  //Delete old map and clear the source
  var elem = document.getElementById("map");
  elem.parentNode.removeChild(elem);
  var div = document.createElement('div');
  div.id = "map";
  div.className = "map";
  document.getElementById("group-maps").appendChild(div);
  //Load new map
  var lnames = new Array();//lnames contains the names of all layers selected
  var nlayers = result.Capability.Layer.Layer.length; //Number of layers
  var i = 0; //Position to roam all layers
  var x = 0; //Position to roam array layersSelected
  var projec; //Projection of the actual layer
  var projections = new Array(); //Projections already defined
  var layerCrs; //The EPSG of the actual layer

  //Create a new toggle with all layers selected, name is title of the service
  var collapmap = document.createElement('div');
  collapmap.innerHTML = '<p id="group_'
  +nmaps+'" onclick="changeSymbol(this)" data-toggle="collapse" data-target="#op'
  +nmaps+'" style="cursor:pointer;margin:0px"><i id="symbol_'
  +nmaps+'" class="glyphicon glyphicon-minus"></i> <u>'
  +result.Service.Title+'</u></p><div id="op'
  +nmaps+'" class="collapse in"></div>';
  document.getElementById("initialdiv").appendChild(collapmap);

  while (i < nlayers) {
      if (i == layersSelected[x]){
      //If the layer and the layer selected by the user match, then
      var format = result.Capability.Request.GetMap.Format[0];
      layerCrs = result.Capability.Layer.Layer[i].BoundingBox[0].crs;
      if (!layerCrs){
        //If there no projection error
        alert("No CRS");
        location.reload();
      }
      //Get all information of each layers
      lnames[lastlayer] = result.Capability.Layer.Layer[i].Name;
      info[lastlayer] = [result.Capability.Layer.Layer[i].Title,
                 result.Capability.Layer.Layer[i].Name,
                 result.Capability.Layer.Layer[i].Abstract,
                 result.Service.ContactInformation.ContactPersonPrimary.ContactPerson,
                 result.Service.ContactInformation.ContactPersonPrimary.ContactOrganization,
                 result.Service.ContactInformation.ContactElectronicMailAddress,
                 result.Service.ContactInformation.ContactVoiceTelephone,
                 result.Service.AccessConstraints,
                 linkUrl,
                 linkUrl.substr(0, linkUrl.indexOf('?'))+"?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+result.Capability.Layer.Layer[i].Name];
        //The map is in EPSG:3857 specific projection
        if((layerCrs != "EPSG:4326")&&(layerCrs != "CRS:84")){
          //If the layer is in other projection
          info[lastlayer].push(layerCrs);
          if (layerCrs == "EPSG:32628") {
            //This is already defined
            projec = new ol.proj.Projection({
              code: layerCrs
            });
          }else{
            if ((projections.indexOf(layerCrs)) < 0){
              //But if it is not defined, create new script
              //where define the new projection
              projections.push(layerCrs);
              var newCRS = layerCrs.substr(layerCrs.indexOf(':')+1, layerCrs.length);
              var scriptUrl = "http://epsg.io/"+newCRS+".js";
              loadScript(scriptUrl, function(){
                projec = new ol.proj.Projection({
                  code: layerCrs
                });
              });
            }else{
              //The projection is already defined but it is diferent EPSG:32628
              projec = new ol.proj.Projection({
                code: layerCrs
              });
            }
          }
          customLayers[lastlayer] = new ol.layer.Tile({
            source: new ol.source.TileWMS({
              url: sourceLink,
              params: {'LAYERS': lnames[lastlayer],
                       'FORMAT': format},
              projection: projec
            }),
            zIndex: '0'
          });
       }else{
         //If the layer is in the right projection
         info[lastlayer].push("EPSG:3857");
         customLayers[lastlayer] = new ol.layer.Tile({
           source: new ol.source.TileWMS({
             url: sourceLink,
             params: {'LAYERS': lnames[lastlayer],
                      'FORMAT': format},
           }),
           zIndex: '0'
         });
       }
       // Add all the layers options Visibility, Opacity and Information
       var layerCode = "<div style ='padding:10px;'><input id='layerVisibility"
       +lastlayer+"' onclick='Visibility(this)' type='checkbox' checked> "
       +info[lastlayer][0]+"<div class='customBoxLayer'>Opacity: <input id='customLayers"
       +lastlayer+"_opa' type='range' min='0' max='1' step='0.1' value='1' class='mobileOptionRange' onchange='changeOpacity(this);'/><span id='customLayers"
       +lastlayer+"_res'>1</span> <a id='"+lastlayer+"'onclick=showInfo(this); class='infoRight' data-toggle='modal' data-target='#infoModal'>Information</a></div></div>";
       var layerDiv = document.createElement('div');
       layerDiv.innerHTML = layerCode;
       document.getElementById("op"+nmaps).appendChild(layerDiv);
       lastlayer++;
       x++;
     }
    i++;
  }
  //Add new grop of maps
  nmaps++;

  //Always push the default layers
  customLayers.push(vector);
  customLayers.push(pipeline);
  customLayers.push(comments);
  customLayers.push(bingAerialLayer);
  customLayers.push(hipsometrico);
  customLayers.push(clinometrico);
  customLayers.push(sombras);
  customLayers.push(temp);
  map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
          zIndex: '-2'
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
  //Rezise the map to user screen resolution

  var width = screen.width;
  if(width <= 699){
    var height = screen.height;
    map.setSize([width, height]);
  }

  //Activate in the map events like click and move the cursor
  map.on('singleclick', clickEvents);
  document.getElementById("collapse2").className = "panel-collapse collapse in";
  //Clear the layer selected and all buttons if there are checked
  layersSelected = [];
  toggle_buttons('non','non');
}
