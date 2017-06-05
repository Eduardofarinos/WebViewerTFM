function changeOpacity(layer){
  if (layer.id == "pipe_opa"){
    document.getElementById("pipe_res").innerHTML = layer.value;
    pipeline.setOpacity(layer.value);
    return;
  }
  if (layer.id == "comm_opa"){
    document.getElementById("comm_res").innerHTML = layer.value;
    comments.setOpacity(layer.value);
    return;
  }
  var aux_id = layer.id.slice(0, -4);
  var num = layer.id.slice(12,13);
  if (layer.id.slice(13,14)!='_'){
    num = layer.id.slice(12,14);
  }
  var aux_res = aux_id + "_res";
  document.getElementById(aux_res).innerHTML = layer.value;
  customLayers[num].setOpacity(layer.value);
}

function Visibility(layer){
  if (layer.id == "vision_pipe"){
    if (layer.checked){
      pipeline.setVisible(true);
      return;
    }else{
      pipeline.setVisible(false);
      return;
    }
  }
  if (layer.id == "vision_comm"){
    if (layer.checked){
      comments.setVisible(true);
      return;
    }else{
      comments.setVisible(false);
      return;
    }
  }
  var num = layer.id.slice(15,16);
  if (layer.id.length>16){
    num = layer.id.slice(15,17);
  }
  if (layer.checked){
    customLayers[num].setVisible(true);
  }else{
    customLayers[num].setVisible(false);
  }
}

function showInfo(layer) {
  if (layer.id == "info_pipe"){
    document.getElementById("inf_title").innerHTML = "tuberia";
    document.getElementById("inf_id").innerHTML = "Layer ID: tfm:tuebria";
    document.getElementById("inf_abs").innerHTML = "Abstract: Red de aguas";
    document.getElementById("inf_cp").innerHTML = "Contact Person: Claudius Ptolomaeus";
    document.getElementById("inf_org").innerHTML = "Organization: The ancient geographes INC";
    document.getElementById("inf_email").innerHTML = "Email: claudius.ptolomaeus@gmail.com";
    document.getElementById("inf_phone").innerHTML = "Telephone: ";
    document.getElementById("inf_ac").innerHTML = "Access Constraints: NONE";
    document.getElementById("inf_wms").innerHTML = "WMS: http://localhost:8080/geoserver/wms?service=wms&version=1.3.0&request=GetCapabilities";
    document.getElementById("inf_legend").innerHTML = "Legend:<br><img src='http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=tfm:tuberia'> Pipeline";
    return;
  }
  if (layer.id == "info_comm"){
    document.getElementById("inf_title").innerHTML = "comments";
    document.getElementById("inf_id").innerHTML = "Layer ID: tfm:comments";
    document.getElementById("inf_abs").innerHTML = "Abstract: Comments of the interest points";
    document.getElementById("inf_cp").innerHTML = "Contact Person: Claudius Ptolomaeus";
    document.getElementById("inf_org").innerHTML = "Organization: The ancient geographes INC";
    document.getElementById("inf_email").innerHTML = "Email: claudius.ptolomaeus@gmail.com";
    document.getElementById("inf_phone").innerHTML = "Telephone: ";
    document.getElementById("inf_ac").innerHTML = "Access Constraints: NONE";
    document.getElementById("inf_wms").innerHTML = "WMS: http://localhost:8080/geoserver/wms?service=wms&version=1.3.0&request=GetCapabilities";
    document.getElementById("inf_legend").innerHTML = "Legend:<br><img src='http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=tfm:comments'> Comment";
    return;
  }
  document.getElementById("inf_title").innerHTML = info[layer.id][0];
  document.getElementById("inf_id").innerHTML = "Layer ID: "+info[layer.id][1];
  document.getElementById("inf_abs").innerHTML = "Abstract: "+info[layer.id][2];
  document.getElementById("inf_cp").innerHTML = "Contact Person: "+info[layer.id][3];
  document.getElementById("inf_org").innerHTML = "Organization: "+info[layer.id][4];
  document.getElementById("inf_email").innerHTML = "Email: "+info[layer.id][5];
  document.getElementById("inf_phone").innerHTML = "Telephone: "+info[layer.id][6];
  document.getElementById("inf_ac").innerHTML = "Access Constraints: "+info[layer.id][7];
  document.getElementById("inf_wms").innerHTML = "WMS: "+info[layer.id][8];
  document.getElementById("inf_legend").innerHTML = "Legend:<br><img src='"+info[layer.id][9]+"'>";
}
