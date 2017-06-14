function addDraw(chx_id, lb_id, Draw_type) {
  map.removeInteraction(draw);
  if (chx_id.checked == false){
    document.getElementById("map").style.cursor = "default";
  }else {
    document.getElementById("map").style.cursor = "none";
    draw = new ol.interaction.Draw({
      clickTolerance: 6,
      source: source,
      type: Draw_type,
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2
        }),
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
    createMeasureTooltip();
    draw.on('drawstart',
        function(evt) {
          // set sketch
          sketch = evt.feature;
        }, this);

    draw.on('drawend',
        function(evt) {
          tooltipid = tooltipid + 1;
          measureTooltipElement.className = 'tooltip-static';
          measureTooltip.setOffset([0, -7]);
          // unset sketch
          sketch = null;
          // unset tooltip so that a new one can be created
          measureTooltipElement = null;
          createMeasureTooltip();
          featureID = featureID + 1;
          evt.feature.setProperties({
              'id': featureID
          })
        }, this);
        toggle_buttons(chx_id, lb_id);
    }
}

function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'tooltip-measure';
  measureTooltipElement.id = 'tooltip'+(tooltipid);
  measureTooltip = new ol.Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  map.addOverlay(measureTooltip);
}

var formatLength = function(line) {
  var length;
  length = Math.round(line.getLength() * 100) / 100;
  var output;
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100) +
        ' ' + 'km';
  } else {
    output = (Math.round(length * 100) / 100) +
        ' ' + 'm';
  }
  return output;
};

var formatArea = function(polygon) {
  var area;
  area = polygon.getArea();
  var output;
  if (area > 10000) {
    output = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
  } else {
    output = (Math.round(area * 100) / 100) +
        ' ' + 'm<sup>2</sup>';
  }
  return output;
};

var formatCircle = function(circle){
  var radius = circle.getRadius();
  var area = 3.14159265359 * (radius * radius);
  var output;
  if (area > 10000) {
    output = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
  } else {
    output = (Math.round(area * 100) / 100) +
        ' ' + 'm<sup>2</sup>';
  }
  return output;
}

function DeleteFeature(id){
  var features = source.getFeatures();
   if (features != null && features.length > 0) {
       for (x in features) {
          var properties = features[x].getProperties();
          var obj = properties.id;
          if (obj == id) {
            source.removeFeature(features[x]);
            var divid = "tooltip"+id;
            document.getElementById(divid).style.display="none";
            break;
          }
       }
   }
}
