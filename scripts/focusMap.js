  var center_geo = document.getElementById('GoTo_geo');
  center_geo.addEventListener('click', function() {
  var longitude = document.getElementById('lon');
  var latitude = document.getElementById('lat');
  var location_geo = ol.proj.fromLonLat([parseFloat(longitude.value),parseFloat(latitude.value)]);
  map.getView().setCenter(location_geo);
  map.getView().setZoom(18);
}, false);

  var center_utm = document.getElementById('GoTo_utm');
  center_utm.addEventListener('click', function() {
  var x = document.getElementById('x');
  var y = document.getElementById('y');
  var pru2 = ol.proj.transform([parseFloat(x.value), parseFloat(y.value)], 'EPSG:32628','EPSG:3857');
  map.getView().setCenter(pru2);
  map.getView().setZoom(18);
}, false);

function zoomdrag(chx_id, lb_id){
  map.removeInteraction(draw);
  if (chx_id.checked == false){
    document.getElementById("map").style.cursor = "default";
    if(boxInteraction){
      boxInteraction.setActive(false);
    }
  }else {
    document.getElementById("map").style.cursor = "zoom-in";
    boxInteraction = new ol.interaction.DragZoom({
          condition: ol.events.condition.noModifierKeys
    });
    map.addInteraction(boxInteraction);
    toggle_buttons(chx_id, lb_id);
  }
}

function centerStreet(lon, lat, feature){
  var pt = [lon, lat];
  var test= ol.proj.transform(pt,'EPSG:32628','EPSG:3857');
  if (feature){
    source.addFeature(new ol.Feature(new ol.geom.Circle(test, 5)));
  }
  map.getView().setCenter(test);
  map.getView().setZoom(19);
}

function showHint() {
  var port = document.getElementById('portal');
  var str = document.getElementById('street');
  if(port.value != ""){
    document.getElementById("txtHint").innerHTML = "";
  }
    if (str.value.length < 3) {
        document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "street.php?calle="+str.value+"&portal="+port.value, true);
        xmlhttp.send();
    }
}

function insertComm() {
    var us = document.getElementById("user");
    var co = document.getElementById("comment");
    var pt = document.getElementById("pto");
    var id = document.getElementById("featureid");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            comments.getSource().updateParams({"time": Date.now()});
            DeleteFeature(id.value);
        }
    };
    xmlhttp.open("POST", "insertCommentv2.php?u="+us.value+"&c="+co.value+"&p="+pt.value, true);
    xmlhttp.send();
}
