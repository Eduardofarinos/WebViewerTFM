//Start globals variables of the project

//Layer where draw
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
//Make draws on the map
var sketch;
var measureTooltipElement;
var measureTooltip;
var boxInteraction;
var draw;
//Delete draws
var featureID = 0;
var tooltipid = 1;
//Default map
var pipeline = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'tuberia'}
  })
});
var comments = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'comments'},
  })
});
var bingAerialLayer = (new ol.layer.Tile({
  preload: Infinity,
  source: new ol.source.BingMaps({
    key: 'Aroc7PVrUIy7ZeTKC7jEaXD34NGaOgxX8USFC-0SuAvL7HtsOVg0NQCKMV8xfLW7',
    imagerySet: 'AerialWithLabels'
  })
}));
var map = new ol.Map({
 layers: [
   new ol.layer.Tile({
     source: new ol.source.OSM(),
     zIndex: '-2'
   }), vector, pipeline, comments, bingAerialLayer
 ],
 target: 'map',
 view: new ol.View({
   center: [-1722584.517212906, 3257823.5051733414],
   zoom: 12
 })
});
pipeline.setVisible(false);
comments.setVisible(false);
bingAerialLayer.setZIndex(-1);
bingAerialLayer.setVisible(false);
//Load wms layers and maps
var lastlayer = 0;
var nmaps = 0;
var info = new Array();
var customLayers = new Array();
var layersSelected = new Array();
var result;

//Delete old infomation of the modal
$('#PointInfo').on('hidden.bs.modal', function () {
  document.getElementById("nodelist").innerHTML = "";
});

//Now we can click in dropdown without disappearing
$('.dropdown-menu a[data-toggle="tab"]').click(function (e) {
    e.stopPropagation()
    $(this).tab('show')
});

//Check if the is there empty or has spaces
function isEmpty(str){
  if (!str.trim() || 0 === str.length){
    return true;
  }else{
    return false;
  }
}

function changeBase(){
  var check = document.getElementById("base");
  if (check.checked){
    document.getElementById("baseLabel").innerHTML = "<label for='base' style='padding-left:5px;margin-top:-2px;cursor:pointer;'><h4>Sat</h4></label>";
    bingAerialLayer.setVisible(true);
  }else{
    document.getElementById("baseLabel").innerHTML = "<label for='base' style='float:right;padding-right:5px;margin-top:-2px;cursor:pointer;'><h4>Map</h4></label>";
    bingAerialLayer.setVisible(false);
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

//The fist load the screen adjust the size and uncheck all buttons,
//just in case they are in chache
window.onload = function(){
  //Get screen resolution
  var width = screen.width;
  var height = screen.height;
  if (width < 699){
    map.setSize([width, height]);
  }
  //Clean checkboxs
  var myCheckbox = document.getElementsByName("myCheckbox");
  Array.prototype.forEach.call(myCheckbox,function(mc){
    mc.checked = false;
  });
}

//Press enter to submit the WMS service
document.getElementById("WMSurl").addEventListener("keydown", function(e){
  if (e.keyCode == 13){
    checkLayers();
  }
}, false);

//If the user click outside of the div, hide the hints
$('#apl').on('touchmove click', function(event){
  if(!$(event.target).is('#txtHint')){
    document.getElementById('txtHint').style.display = "none";
  }
});

//End globals
