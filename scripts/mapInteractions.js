//mapInteractions display or hide the features on the map

//Function draw features on the map, can be a line, polygon or circle
function addDraw(chx_id, lb_id, Draw_type) {
  map.removeInteraction(draw);
  document.getElementById("map").className = "map";
  if (chx_id.checked == false){
    //If the user uncheck change de cursor and do nothing
    document.getElementById("map").style.cursor = "default";
  }else {
    document.getElementById("map").style.cursor = "none";
    draw = new ol.interaction.Draw({
      clickTolerance: 6,
      //When drawing in the layer source/vector
      source: source,
      type: Draw_type,
      style: new ol.style.Style({
        //Fill without color
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.4)'
        }),
        //Black dotted lines
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2
        }),
        //Now the cursor is a transparent circle with the black border
        //to give the user better accuracy
        image: new ol.style.Circle({
          radius: 5,
          stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 0.7)'
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          })
        })
      })
    });
    map.addInteraction(draw);
    //User can see the measure all the time
    createMeasureTooltip();
    //Following the stroke
    draw.on('drawstart',
        function(evt) {
          // set sketch
          sketch = evt.feature;
          var tooltipCoord = evt.coordinate;
          listener = sketch.getGeometry().on('change', function(evt){
            var geom = evt.target;
            var output;
            if (geom instanceof ol.geom.Polygon){
              //output area of the polygon
              output = formatArea(geom);
              tooltipCoord = geom.getInteriorPoint().getCoordinates();
            }
            if (geom instanceof ol.geom.LineString){
              //output length of the line
              output = formatLength(geom);
              tooltipCoord = geom.getLastCoordinate();
            }
            if (geom instanceof ol.geom.Circle){
              //output area of the circle
              output = formatCircle(geom);
              tooltipCoord = geom.getLastCoordinate();
            }
            //Add function delete features
            measureTooltipElement.innerHTML = output + " <a onclick=DeleteFeature("
            +(featureID+1)+"); style='cursor:pointer;'><sup>X</sup></a>";
            measureTooltip.setPosition(tooltipCoord);
          });
        }, this);

    //And when ends, create a tooltip with the measure
    draw.on('drawend',
        function(evt) {
          tooltipid = tooltipid + 1;
          measureTooltipElement.className = 'tooltip-static';
          //Final position
          measureTooltip.setOffset([0, -7]);
          //Unset sketch
          sketch = null;
          //Unset tooltip so that a new one can be created
          measureTooltipElement = null;
          //Finally display the measure
          createMeasureTooltip();
          featureID = featureID + 1;
          //Set the id to be able to erase
          evt.feature.setProperties({
              'id': featureID
          })
        }, this);
        //Clear buttons
        toggle_buttons(chx_id, lb_id);
    }
}

//Handle the message where the user recives draws measure
function createMeasureTooltip() {
  if (measureTooltipElement) {
    //In case the last tooltip still
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  //Create the div, their class and id, to be able to erase
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'tooltip-measure';
  measureTooltipElement.id = 'tooltip'+(tooltipid);
  //Positioning on the map
  measureTooltip = new ol.Overlay({
    element: measureTooltipElement,
    //While drawing position
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  map.addOverlay(measureTooltip);
}

//Change the measures units
function changeUnits(measure, idSelect){
  var measureId = idSelect.id.substr(idSelect.id.indexOf('_'), idSelect.id.length);
  measureId = 'res'+measureId;
  if(idSelect.id[0]=='l'){
    //If is length of LineString
    if(idSelect.value == "m"){
      //Change to meters
      measure = (Math.round(measure * 100) / 100);
      document.getElementById(measureId).innerHTML = measure;
    }else{
      //Change to kilometers
      measure = (Math.round(measure / 1000 * 100) / 100);
      document.getElementById(measureId).innerHTML = measure;
    }
  }else{
    //Area, polygon or circle
    if(idSelect.value == "m"){
      //Meters
      measure = (Math.round(measure * 100) / 100);
      document.getElementById(measureId).innerHTML = measure;
    }else{
      //Kilometers
      measure = (Math.round(measure / 1000000 * 100) / 100);
      document.getElementById(measureId).innerHTML = measure;
    }
  }
}

//Calculates the distance the user draw
var formatLength = function(line) {
  var length;
  length = Math.round(line.getLength() * 100) / 100;
  length = (Math.round(length * 100) / 100); //Display in meters by default
  //Create id so we can change *this measure
  var id = "length_"+tooltipid;
  //Length + the selector in meters and kilometers
  var output = '<label style="margin-bottom:0px;" id=res_'
  +tooltipid+'>'+ length +'</label><select id="'
  +id+'" class="select-style" onchange="changeUnits('
  +length+','+id+');" ><option value="m">m</option><option value="km">km</option></select>';
  //Final output
  return output;
};

//Calculates polygon area that user draw
var formatArea = function(polygon) {
  var area;
  area = polygon.getArea();
  area = (Math.round(area * 100) / 100);//Meter by default
  //Create id so we can change *this measure
  var id = "area_"+tooltipid;
  //Area + the selector in meters and kilometers
  var output = '<label style="margin-bottom:0px;" id=res_'
  +tooltipid+'>'+ area +'</label><select id="'+
  id+'" class="select-style" onchange="changeUnits('
  +area+','+id+');" ><option value="m">m&sup2;</option><option value="km">km&sup2;</option></select>';
  //Final output
  return output;
};

//Calculates circle area that user draw
var formatCircle = function(circle){
  var radius = circle.getRadius();
  var area = 3.14159265359 * (radius * radius);
  area = (Math.round(area * 100) / 100);//Meter by default
  //Create id so we can change *this measure
  var id = "area_"+tooltipid;
  //Area + the selector in meters and kilometers
  var output = '<label style="margin-bottom:0px;" id=res_'
  +tooltipid+'>'+ area +'</label><select id="'
  +id+'" class="select-style" onchange="changeUnits('
  +area+','+id+');" ><option value="m">m&sup2;</option><option value="km">km&sup2;</option></select>';
  //Final output
  return output;
}

//Handle the free drawing on the map
function freeDraw(chx_id, lb_id, mobile) {
  map.removeInteraction(draw);
  document.getElementById("map").className = "map";
  if (chx_id.checked == false){
    //If the user uncheck change de cursor and do nothing
    document.getElementById("map").style.cursor = "default";
  }else {
    //It is like the function addDraw
    document.getElementById("map").style.cursor = "none";
    draw = new ol.interaction.Draw({
      source: source,
      type: "LineString",
      freehand: true //but this variable is true
    });
    map.addInteraction(draw);
    toggle_buttons(chx_id, lb_id);
  }
  if (mobile == 'true'){
    //If it mobile, display the color and size menu
    var divMenu = document.getElementById('drawMobile');
    if (divMenu.style.display === 'none') {
      //Display the div
      divMenu.style.display = 'inline-block';
    } else {
      //Hide the div
      divMenu.style.display = 'none';
    }
    if (chx_id.checked == true){
      //Clear other buttons
      toggle_buttons(chx_id, lb_id, 'drawMobile');
    }else{
      //The user wants to hide the div clicking the same button
      divMenu.style.display = "none";
    }
  }
}

//This function erases the drawing and message on the map
function DeleteFeature(id){
  var features = source.getFeatures();
   if (features != null && features.length > 0) {
     //If there are features, search the selected to erase
       for (x in features) {
          var properties = features[x].getProperties();
          var obj = properties.id;
          if (obj == id) {
            //Delete the feature
            source.removeFeature(features[x]);
            //And hide the tooltip
            var divid = "tooltip"+id;
            document.getElementById(divid).style.display="none";
            break;
          }
       }
   }
}
