//Start globals variables of the project

//Make draws on the map
var sketch;
var measureTooltipElement;
var measureTooltip;
var boxInteraction;
var draw;
//Delete draws
var featureID = 0;
var selectedFeatureID;
var tooltipid = 1;
//Initial map
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
//Load wms layers and maps
var linkUrl;
var lastlayer = 0;
var nmaps = 0;
var info = new Array();
var customLayers = new Array();
var group_count = 0;
var layerCrs;
var projec;
var layersSelected = new Array();
var t;
var result;
//Group buttons events
var evt_move;
var evt_grab;
//Number of static layers
var defaultLayers;

//Delete old infomation of the modal
$('#PointInfo').on('hidden.bs.modal', function () {
  document.getElementById("nodelist").innerHTML = "";
});

//User Can't rigth click on the map
$('.map').bind('contextmenu', function(e) {
    return false;
});

//Now we can click in dropdown without disappearing
$('.dropdown-menu a[data-toggle="tab"]').click(function (e) {
    e.stopPropagation()
    $(this).tab('show')
});

//Check if the input is empty or has spaces
function isEmpty(str){
  if (!str.trim() || 0 === str.length){
    return true;
  }else{
    return false;
  }
}

//Add definition of a new projection in the head
function loadScript(url, callback){
  var script = document.createElement("script")
  script.type = "text/javascript";
  if (script.readyState){
    //For Internet Explorer
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  }else{
    //For the others explorers
    script.onload = function(){
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

//Every time the screen resize the map adjust width and height
window.onresize = function(){
  //Get screen resolution
  var width = screen.width;
  var height = screen.height;
  map.setSize([width, height]);
}

//The fist load the screen adjust the size and uncheck all buttons,
//just in case they are in chache
window.onload = function(){
  //Get screen resolution
  var width = screen.width;
  var height = screen.height;
  map.setSize([width, height]);
  //Clean checkboxs
  var myCheckbox = document.getElementsByName("myCheckbox");
  Array.prototype.forEach.call(myCheckbox,function(mc){
    mc.checked = false;
  });
}

//End globals
