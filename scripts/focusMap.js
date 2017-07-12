//Tools group to change the map view and get general coordinates in diferents projections

//Center the view geographic coordinates
var center_geo = document.getElementById('GoTo_geo');
center_geo.addEventListener('click', function() {
  var longitude = document.getElementById('lon');
  var latitude = document.getElementById('lat');
  if ((isEmpty(longitude.value))||(isEmpty(latitude.value))) {
    alert("Invalid parameters");
    return;
  }
  //If not empty, change the coordinates to the rigth projection
  var location_geo = ol.proj.fromLonLat([parseFloat(longitude.value),parseFloat(latitude.value)]);
  map.getView().setCenter(location_geo);
  map.getView().setZoom(18);
}, false);

//Center the view UTM coordinates
var center_utm = document.getElementById('GoTo_utm');
center_utm.addEventListener('click', function() {
  var x = document.getElementById('x');
  var y = document.getElementById('y');
  if ((isEmpty(x.value))||(isEmpty(y.value))) {
    alert("Invalid parameters");
    return;
  }
  //If not empty, change the coordinates to the rigth projection
  var location_utm = ol.proj.transform([parseFloat(x.value), parseFloat(y.value)], 'EPSG:32628','EPSG:3857');
  map.getView().setCenter(location_utm);
  map.getView().setZoom(18);
}, false);


//This function add a new map interaction
function zoomdrag(chx_id, lb_id){
  map.removeInteraction(draw);
  document.getElementById("map").className = "map";
  if (chx_id.checked == false){
    //Unchecked by the user, then disable the interaction
    document.getElementById("map").style.cursor = "default";
    if(boxInteraction){
      boxInteraction.setActive(false);
    }
  }else {
    //Now the DragZoom doesn't need press shift to activate
    document.getElementById("map").style.cursor = "zoom-in";
    boxInteraction = new ol.interaction.DragZoom({
          condition: ol.events.condition.noModifierKeys
    });
    map.addInteraction(boxInteraction);
    //Always check the buttons are ok
    toggle_buttons(chx_id, lb_id);
  }
}

//Center the view on street given on the rigth projection
function centerStreet(lon, lat, feature){
  var pt = [lon, lat];
  var street = ol.proj.transform(pt,'EPSG:32628','EPSG:3857');
  if (feature){
    //If the user put gate or portal, circle to highlight the goal
    source.addFeature(new ol.Feature(new ol.geom.Circle(street, 5)));
  }
  map.getView().setCenter(street);
  map.getView().setZoom(19);
}

//Search in database possibles streets similar to user request.
//Every time the user write a letter
function showHint() {
  var port = document.getElementById('portal');
  var str = document.getElementById('street');
  var div = document.getElementById('txtHint');
  if(div.style.display == "none"){
    //To quit the property none
    div.style.display = "inline-block";
  }
  if(port.value != ""){
    //If empty dont show nothing
    document.getElementById("txtHint").innerHTML = "";
  }
  if (str.value.length < 3) {
    //while the request is minor than 3 show nothing
      document.getElementById("txtHint").innerHTML = "";
      return;
  } else {
    //When is more than 3 make a database request
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

//Insert a new comment in the database
function insertComm() {
  var us = document.getElementById("user");
  var co = document.getElementById("comment");
  var pt = document.getElementById("pto");
  var id = document.getElementById("featureid");
  var xmlhttp = new XMLHttpRequest();
  //Make the post to the batabse
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //Update the map with the new point
        comments.getSource().updateParams({"time": Date.now()});
        //And delete the feature with the form.
        DeleteFeature(id.value);
      }
  };
  xmlhttp.open("POST", "insertComment.php?u="+us.value+"&c="+co.value+"&p="+pt.value, true);
  xmlhttp.send();
}
