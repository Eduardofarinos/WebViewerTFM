//Start globals variables of the project

//Layer where draw and features
var baseWidth = 2;
var baseColor = '#ffcc33';
var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
  source: source,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.4)'
    }),
    stroke: new ol.style.Stroke({
      color: baseColor,
      width: baseWidth
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: baseColor
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
//Default maps
var pipeline = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/wms', //Source
    params: {'LAYERS': 'tuberia'} //Same of the layer
  }),
  visible: false //Hidden by default
});
var comments = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/wms',
    params: {'LAYERS': 'comments'},
  }),
  visible: false
});
//Satellite map
var bingAerialLayer = (new ol.layer.Tile({
  preload: Infinity,
  source: new ol.source.BingMaps({
    key: '**********************************',
    imagerySet: 'AerialWithLabels'
  }),
  zIndex: '-1',
  visible: false
}));
//Thematic maps
var hipsometrico = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://idecan1.grafcan.es/ServicioWMS/Hipsometrico',
    params: {'LAYERS': 'WMS_HIPSOMETRICO',
             'FORMAT': 'image/jpeg'},
    projection: 'EPSG:32628'
  }),
  zIndex: '-1',
  visible: false
});
var clinometrico = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://idecan1.grafcan.es/ServicioWMS/Clinometrico',
    params: {'LAYERS': 'WMS_CLINOMETRICO',
             'FORMAT': 'image/jpeg'},
    projection: 'EPSG:32628'
  }),
  zIndex: '-1',
  visible: false
});
var sombras = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://idecan1.grafcan.es/ServicioWMS/MDSombras',
    params: {'LAYERS': 'WMS_HS',
             'FORMAT': 'image/jpeg'},
    projection: 'EPSG:32628'
  }),
  zIndex: '-1',
  visible: false
});
var temp = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://idecan1.grafcan.es/ServicioWMS/MapaSolar',
    params: {'LAYERS': 'temperatura',
             'FORMAT': 'image/jpeg'},
    projection: 'EPSG:32628'
  }),
  zIndex: '-1',
  visible: false
});
var map = new ol.Map({
 layers: [
   new ol.layer.Tile({
     source: new ol.source.OSM(),
     zIndex: '-2'
   }), vector, pipeline, comments, bingAerialLayer, hipsometrico,
       clinometrico, sombras, temp
 ],
 target: 'map',
 view: new ol.View({
   center: [-1722584.517212906, 3257823.5051733414],
   zoom: 12
 })
});
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
  //Add to head
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
