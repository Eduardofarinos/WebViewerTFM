//Changes and handle the styles and functions from the view

//Display or hide the left menu
function toggleMenu() {
  //Two buttons one to hide the other to display
  var lmenu = document.getElementById('leftmenu');
  var hmenu = document.getElementById('hiddenMenu');
  if (lmenu.style.display === 'none') {
    //The user wants to display the menu
    lmenu.style.display = 'inline-block';
    hmenu.style.display = 'none';
  } else {
    //The user wants to hide the menu
    lmenu.style.display = 'none';
    hmenu.style.display = 'inline-block';
  }
}

//Show or hide the different mobile menus with tools
function displayMenu(chx_id, lb_id, div_id){
  document.getElementById("map").style.cursor = "default";
  map.removeInteraction(draw);
  var divMenu = document.getElementById(div_id);
  if (divMenu.style.display === 'none') {
    //Display the div
    divMenu.style.display = 'inline-block';
  } else {
    //Hide the div
    divMenu.style.display = 'none';
  }
  if (chx_id.checked == true){
    //Clear other buttons
    toggleButtons(chx_id, lb_id, div_id);
  }else{
    //The user wants to hide the div clicking the same button
    divMenu.style.display = "none";
  }
}

//Change the symbol plus or minus in maps menu
function changeSymbol(group){
  //First we need to know what button is getting the id
  var aux = group.id.substr(group.id.indexOf('_'), group.id.length);
  var sym = document.getElementById("symbol_"+aux.substr(1, aux.length));
  if (sym.className == 'glyphicon glyphicon-minus'){
    //If it is minus change to plus
    sym.className = 'glyphicon glyphicon-plus';
  }else{
    //Else change to minus
    sym.className = 'glyphicon glyphicon-minus';
  }
}

//Change the cursor style and open events to click and move the map
function mHand(chx_id, lb_id){
  map.removeInteraction(draw);
  if (chx_id.checked == false){
    //Unchecking, stop listening this events on the map
    document.getElementById("map").style.cursor = "default";
    ol.Observable.unByKey(evt_move);
    ol.Observable.unByKey(evt_grab);
  }else {
    //Change the cursor to a hand and when the user click change it
    //to a fist
    document.getElementById("map").style.cursor = "grab";
    evt_move =  map.on('pointerdrag', function(){
      document.getElementById("map").style.cursor = "move";
    });
    evt_grab = map.on('moveend', function(){
      document.getElementById("map").style.cursor = "grab";
    });
    //Always clear the buttons and events
    toggleButtons(chx_id, lb_id);
  }
}

//Only the button selected is active, and delete functions a events
//when they are not needed
function toggleButtons (checkboxId, labelId, divId){
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
  //For Menus
  var mydiv = document.getElementsByName("mydiv");
  Array.prototype.forEach.call(mydiv,function(md){
    md.style.display = "none";
  });
  if (divId) {
    //Only display this div
    var mobileMenu = document.getElementById(divId);
    mobileMenu.style.display = "inline-block";
  }
  //For Zoom-Drag
  if(document.getElementById(labelId)){
    document.getElementById(labelId).classList.add('active');
    if ((boxInteraction)&&(checkboxId.id!='zd')){
      //Deactivate the interaction
      boxInteraction.setActive(false);
    }
  }
  //For mouse pointer
  var moveHand = document.getElementById('mov');
  if (moveHand.checked == false){
    //Stop listening
    ol.Observable.unByKey(evt_move);
    ol.Observable.unByKey(evt_grab);
  }
}

//Only change the cursor style
function setCursor(chx_id, lb_id){
  map.removeInteraction(draw);
  if (chx_id.checked == false){
    //Case user uncheck
    document.getElementById("map").style.cursor = "default";
  }else {
    if (chx_id.id == 'zi'){
      //Zoom-in
      document.getElementById("map").style.cursor = "zoom-in";
    }
    if (chx_id.id == 'zo'){
      //Zoom-out
      document.getElementById("map").style.cursor = "zoom-out";
    }
    if (chx_id.id == 'fid'){
      //Feature information
      document.getElementById("map").style.cursor = "default";
    }
    toggleButtons(chx_id, lb_id);
  }
}

//Handle the button go to coordinates
function setCoord(chx_id, lb_id) {
  map.removeInteraction(draw);
  document.getElementById("map").style.cursor = "default";
  var dropCheck = document.getElementById(chx_id);
  var dropLabel = document.getElementById(lb_id);
  if ($(dropCheck).hasClass("open")){
    //If dropmenu is open the button must be active
    $(dropLabel).removeClass("active");
  }else {
    //Clear menu buttons and events
    toggleButtons(chx_id, lb_id);
  }
}
