//mapInteractions display or hide the features on the map

//Function draw features on the map, can be a line, polygon or circle
function addDraw(chx_id, lb_id, Draw_type) {
  map.removeInteraction(draw);
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
          color: 'rgba(255, 255, 255, 0.2)'
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
        toggleButtons(chx_id, lb_id);
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

//Calculates the distance the user draw
var formatLength = function(line) {
  var length;
  length = Math.round(line.getLength() * 100) / 100;
  var output;
  if (length > 100) {
    //The output is in kilometers
    output = (Math.round(length / 1000 * 100) / 100) +
        ' ' + 'km';
  } else {
    //The output is in meters
    output = (Math.round(length * 100) / 100) +
        ' ' + 'm';
  }
  return output;
};

//Calculates polygon area that user draw
var formatArea = function(polygon) {
  var area;
  area = polygon.getArea();
  var output;
  if (area > 10000) {
    //The output is in kilometers
    output = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
  } else {
    //The output is in meters
    output = (Math.round(area * 100) / 100) +
        ' ' + 'm<sup>2</sup>';
  }
  return output;
};

//Calculates circle area that user draw
var formatCircle = function(circle){
  var radius = circle.getRadius();
  var area = 3.14159265359 * (radius * radius);
  var output;
  if (area > 10000) {
    //The output is in kilometers
    output = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
  } else {
    //The output is in meters
    output = (Math.round(area * 100) / 100) +
        ' ' + 'm<sup>2</sup>';
  }
  return output;
}

//This function erases the drawing and message on the map
function deleteFeature(id){
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
