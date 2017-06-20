function Togglemenu() {
    var x = document.getElementById('leftmenu');
    var y = document.getElementById('toggle_menu');
    if (x.style.display === 'none') {
        x.style.display = 'block';
        y.style.display = 'none';

    } else {
        x.style.display = 'none';
        y.style.display = 'block';
    }
}

function changeSymbol(group){
  var aux = group.id.substr(group.id.indexOf('_'), group.id.length);
  var sym = document.getElementById("symbol_"+aux.substr(1, aux.length));
  if (sym.className == 'glyphicon glyphicon-minus'){
    sym.className = 'glyphicon glyphicon-plus';
  }else{
    sym.className = 'glyphicon glyphicon-minus';
  }
}

function mHand(chx_id, lb_id){
  map.removeInteraction(draw);
  if (chx_id.checked == false){
    document.getElementById("map").style.cursor = "default";
    ol.Observable.unByKey(evt_move);
    ol.Observable.unByKey(evt_grab);
  }else {
    if(boxInteraction){
      boxInteraction.setActive(false);
    }
      document.getElementById("map").style.cursor = "grab";
      evt_move =  map.on('pointerdrag', function(){
          document.getElementById("map").style.cursor = "move";
      });
      evt_grab = map.on('moveend', function(){
          document.getElementById("map").style.cursor = "grab";
      });
      toggle_buttons(chx_id, lb_id);
  }
}

function toggle_buttons (checkboxId, labelId){
  //For Checkbox
  var myCheckbox = document.getElementsByName("myCheckbox");
  Array.prototype.forEach.call(myCheckbox,function(mc){
    mc.checked = false;
  });
  checkboxId.checked = true;
  //For Label
  var mylabel = document.getElementsByName("mylabel");
  Array.prototype.forEach.call(mylabel,function(ml){
    ml.classList.remove('active');
  });
  //For Zoom-Drag
  document.getElementById(labelId).classList.add('active');
  if ((boxInteraction)&&(checkboxId.id!='zd')){
    boxInteraction.setActive(false);
  }
  //For mouse pointer
  var moveHand = document.getElementById('mov');
  if (moveHand.checked == false){
    ol.Observable.unByKey(evt_move);
    ol.Observable.unByKey(evt_grab);
  }
}

function setCursor(chx_id, lb_id){
  map.removeInteraction(draw);
  if (chx_id.checked == false){
    document.getElementById("map").style.cursor = "default";
  }else {
    if (chx_id.id == 'zi'){
      document.getElementById("map").style.cursor = "zoom-in";
    }
    if (chx_id.id == 'zo'){
      document.getElementById("map").style.cursor = "zoom-out";
    }
    if (chx_id.id == 'fid'){
      document.getElementById("map").style.cursor = "default";
    }
    toggle_buttons(chx_id, lb_id);
  }
}
