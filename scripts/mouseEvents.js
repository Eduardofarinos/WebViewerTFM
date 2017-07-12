//Handle the events that user can do with the mouse on the map

//Every time a user click on the map clickEvents is responsible
//for managing its operation
var clickEvents = function(evt){
  //Get all the checkbox that could join in a click
  var zin = document.getElementById('zi');
  var zou = document.getElementById('zo');
  var feat = document.getElementById('fid');
  var pto = document.getElementById('poi');
  var comment = document.getElementById('com');
  var vision_pipe = document.getElementById('vision_pipe');
  var vision_comm = document.getElementById('vision_comm');
  //Get the coordinates in the right projection
  var coordinate = evt.coordinate;
  if (pto.checked){
    //The user wants DMS coordinates
    var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
        coordinate, 'EPSG:3857', 'EPSG:4326'));
    createMeasureTooltip();
    measureTooltipElement.innerHTML = "<div id='tooltip"
    +(tooltipid-1)+"' class='tooltip-static'>"
    +hdms+" <a onclick=DeleteFeature("
    +(featureID)+"); style='cursor:pointer;'><sup>X</sup></a></div>";
    measureTooltip.setPosition(coordinate);
    measureTooltipElement = null;
    createMeasureTooltip();
    ol.Observable.unByKey();
  }
  if (comment.checked){
    //Display the form for instertComm on the coordinates user click
    createMeasureTooltip();
    measureTooltipElement.innerHTML = '<div id="tooltip'
    +(tooltipid-1)+'" class="tooltip-static"><form><div class="form-group"><label for="user">User:</label><input type="text" class="form-control" id="user" style="border-radius:0px"></div><div class="form-group" style="margin-bottom:7px"><label for="comment">Comment:</label><br><textarea rows="5" cols="25" id="comment">Write the comment</textarea><input type="hidden" id="featureid" value="'
    +featureID+'"><input type="hidden" id="pto" value="'
    +coordinate + '"><br><div class="centerDivBtn"><button type="button" style="margin-right:25px;" name="button" class="btn commBtn" onclick=DeleteFeature('
    +featureID+');>Cancel</button><button type="button" name="button" class="btn commBtn" onclick="insertComm()">Submit</button></div></form></div>';
    measureTooltip.setPosition(coordinate);
    measureTooltipElement = null;
    createMeasureTooltip();
    ol.Observable.unByKey();
  }
  if (zin.checked){
    //Bring closer the view one level in the click event
    map.getView().setCenter(coordinate);
    map.getView().setZoom(map.getView().getZoom()+1);
  }
  if (zou.checked){
    //Move away the view one level in the click event
    map.getView().setCenter(coordinate);
    map.getView().setZoom(map.getView().getZoom()-1);
  }
  if (feat.checked){
    //Display a modal where the user can see the information of selected layers
    var view = map.getView();
    var viewResolution = (view.getResolution());
    var url;
    var code;
    var flag = false; //In case the user did not select any layer
    if (vision_pipe.checked){
      //Show information of default layer pipeline in the specific coordinates
      flag = true;
      url = pipeline.I.source.getGetFeatureInfoUrl(
          evt.coordinate, viewResolution, 'EPSG:3857',
          {'INFO_FORMAT': 'text/html'});
      code = '<iframe seamless src="' + url + '"style="width:100%"></iframe>';
      var newdiv = document.createElement('div');
      newdiv.innerHTML = code;
      document.getElementById("nodelist").appendChild(newdiv);
    }
    if (vision_comm.checked){
      //Show information of default layer pipeline in the specific coordinates
      flag = true;
      url = comments.I.source.getGetFeatureInfoUrl(
          evt.coordinate, viewResolution, 'EPSG:3857',
          {'INFO_FORMAT': 'text/html'});
      code = '<iframe seamless src="' + url + '"style="width:100%"></iframe>';
      var newdiv = document.createElement('div');
      newdiv.innerHTML = code;
      document.getElementById("nodelist").appendChild(newdiv);
    }
    for (var i = 0; i < (customLayers.length - 3); i++) {
      //For each layer check if has been selected
      var layer_act =  document.getElementById('layerVisibility'+i);
      if (layer_act.checked){
        flag = true;
        //Request the feature information of the layer
        url = customLayers[i].I.source.getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, info[i][10],
            {'INFO_FORMAT': 'text/html'});
        //The modal display an inline frame with the requested data
        code = '<iframe seamless src="' + url + '"style="width:100%"></iframe>';
        var newdiv = document.createElement('div');
        newdiv.innerHTML = code;
        document.getElementById("nodelist").appendChild(newdiv);
      }
    }
    if(!flag){
      //If at the end of the function flag is false, means the user did not select any layer
      document.getElementById("nodelist").innerHTML = "<h3>No layers selected<h3>";
    }
    //Show the modal
    $('#PointInfo').modal('show');
  }
}
//Activate the functions listeners for map
map.on('singleclick', clickEvents);
