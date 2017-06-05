var pointerMoveHandler = function(evt) {
  if (evt.dragging) {
    return;
  }
  var tooltipCoord = evt.coordinate;

  if (sketch) {
    var output;
    var geom = (sketch.getGeometry());
    if (geom instanceof ol.geom.Polygon) {
      output = formatArea(geom);
      tooltipCoord = geom.getInteriorPoint().getCoordinates();
    } else if (geom instanceof ol.geom.LineString) {
      output = formatLength(geom);
      tooltipCoord = geom.getLastCoordinate();
    } else if (geom instanceof ol.geom.Circle){
      output = formatCircle(geom);
      tooltipCoord = geom.getLastCoordinate();
    }
    measureTooltipElement.innerHTML = output + " <a onclick=DeleteFeature("+(featureID+1)+"); style='cursor:pointer;'>X</a>";
    measureTooltip.setPosition(tooltipCoord);
  }
};

var clickEvents = function(evt){
  var zin = document.getElementById('zi');
  var zou = document.getElementById('zo');
  var feat = document.getElementById('fid');
  var pto = document.getElementById('poi');
  var comment = document.getElementById('com');
  var vision_pipe = document.getElementById('vision_pipe');
  var vision_comm = document.getElementById('vision_comm');

  var coordinate = evt.coordinate;
  var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
      coordinate, 'EPSG:3857', 'EPSG:4326'));
  if (pto.checked){
    measureTooltipElement.innerHTML = "<div id='tooltip"+(tooltipid-1)+"' class='tooltip-static'>"+hdms+" <a onclick=DeleteFeature("+(featureID)+"); style='cursor:pointer;'>X</a></div>";
    measureTooltip.setPosition(coordinate);
    measureTooltipElement = null;
    createMeasureTooltip();
    ol.Observable.unByKey();
  }
  if (comment.checked){
    createMeasureTooltip();
    measureTooltipElement.innerHTML =
    '<div id="tooltip'+(tooltipid-1)+'" class="tooltip-static"><form>User:<br><input type="text" id="user"><br>Comment:<br><textarea id="comment">Write the comment</textarea><input type="hidden" id="featureid" value="'+featureID+'"><input type="hidden" id="pto" value="' +
    coordinate + '"><br><a onclick=DeleteFeature('+featureID+'); style="cursor:pointer;" class="btn btn-default">Cancel</a><button type="button" name="button" class="btn btn-default" onclick="insertComm()">submit</button></form></div>';
    measureTooltip.setPosition(coordinate);
    measureTooltipElement = null;
    createMeasureTooltip();
    ol.Observable.unByKey();
  }
  if (zin.checked){
    map.getView().setCenter(coordinate);
    map.getView().setZoom(map.getView().getZoom()+1);
  }
  if (zou.checked){
    map.getView().setCenter(coordinate);
    map.getView().setZoom(map.getView().getZoom()-1);
  }
  if (feat.checked){
    var view = map.getView();
    var viewResolution = (view.getResolution());
    var url;
    var code;
    var flag = false;
    if (vision_pipe.checked){
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
      flag = true;
      url = comments.I.source.getGetFeatureInfoUrl(
          evt.coordinate, viewResolution, 'EPSG:3857',
          {'INFO_FORMAT': 'text/html'});
      code = '<iframe seamless src="' + url + '"style="width:100%"></iframe>';
      var newdiv = document.createElement('div');
      newdiv.innerHTML = code;
      document.getElementById("nodelist").appendChild(newdiv);
    }
    for (var i = 0; i < (customLayers.length - defaultLayers); i++) {
      var layer_act =  document.getElementById('layerVisibility'+i);
      if (layer_act.checked){
        flag = true;
        url = customLayers[i].I.source.getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, 'EPSG:3857',
            {'INFO_FORMAT': 'text/html'});
        code = '<iframe seamless src="' + url + '"style="width:100%"></iframe>';
        var newdiv = document.createElement('div');
        newdiv.innerHTML = code;
        document.getElementById("nodelist").appendChild(newdiv);
      }
    }
    if(!flag){
      document.getElementById("nodelist").innerHTML = "<h3>No layers selected<h3>";
    }
    $('#PointInfo').modal('show');
  }
}

defaultLayers = 0;
map.on('pointermove', pointerMoveHandler);
map.on('singleclick', clickEvents);
