//Start Globals
//draws
var sketch;
var measureTooltipElement;
var measureTooltip;
var boxInteraction;
var draw;
//delete draws
var featureID = 0;
var otro;
var selectedFeatureID;
var tooltipid = 1;
//modal
var modal = document.getElementById('WMSurl');
//initial map
var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
  source: source,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  })
});
vector.setZIndex(99);
var pipeline = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'tuberia'},
  })
});
var comments = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'comments'},
  })
});
var map = new ol.Map({
 layers: [
   new ol.layer.Tile({
     source: new ol.source.OSM()
   }), vector, pipeline, comments
 ],
 target: 'map',
 view: new ol.View({
   center: [-1722584.517212906, 3257823.5051733414],
   zoom: 12
 })
});
pipeline.setVisible(false);
comments.setVisible(false);
//load wms
var lastlayer = 0;
var nmaps = 0;
var info = new Array();
var customLayers = new Array();
var group_count = 0;
var layerCrs;
var projec;
//group buttons events
var evt_move;
var evt_grab;
var defaultLayers;
//end Globals

$('#PointInfo').on('hidden.bs.modal', function () {
  document.getElementById("nodelist").innerHTML = "";
})

$('.map').bind('contextmenu', function(e) {
    return false;
});

function isEmpty(str){
  if (!str.trim() || 0 === str.length){
    return true;
  }else{
    return false;
  }
}

function loadScript(url, callback){
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

window.onresize = function(){
  var width = screen.width;
  var height = screen.height;
  var size = map.getSize();
  map.setSize([width, height])
}
