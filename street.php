<?php
//Get the coordinates of the street that user wants
//Establishing connection with the database
$strCnx = "host='localhost' port='5432' dbname='tfm' user='postgres' password='*********'";
$cnx = pg_connect($strCnx) or die ("Connection error. ". pg_last_error());
//Request info
$req = $_GET['calle'];
$portal = $_GET['portal'];

$row = array(); //Result of the request
$aux = array();// [
$aux2 = array();// -> To break down the information
$aux3 = array();//[
$coord = array(); //Coordinate at the beginning of the street

echo "<div class='results'>";
if ($portal != ""){
  //Searching for a street and a specific portal number
  $result = pg_query($cnx, "SELECT nombre_via, ST_AsText(geom), portal
                    FROM callejero.portales where unaccent(nombre_via) ILIKE unaccent('%".$req."%') and portal='".$portal."'");
  if (pg_num_rows($result)==0){
    //The name of the street has not been found
    echo "No results";
  }else{
    while ($row = pg_fetch_row($result)) {
      //Extract the coordinates in the right place
      $aux = explode("(", $row[1]);
      $aux2 = explode(" ", $aux[1]);
      $aux3 = explode(",", $aux2[1]);
      //Link to center the view on the street and portal
      echo "<div class='street'><div class='directions' onclick='centerStreet("
      .$aux2[0].",".substr($aux3[0], 0, -1).",true)'>".$row[0].", nº"
      .$row[2]."</div></div>";
    }
  }
  echo "</div>";
}
if (($req != "")&&($portal == "")){
  //Just searching for a street

  $result = pg_query($cnx, "SELECT nombre_via, ST_AsText(geom), tipo_via
                    FROM callejero.vial where unaccent(nombre_via) ILIKE unaccent('%".$req."%');");
  if (pg_num_rows($result)==0){
    //The name of the street and portal has not been found
    echo "No results";
  }else{
    while ($row = pg_fetch_row($result)) {
      $aux = explode("(", $row[1]);
      $aux2 = explode(" ", $aux[2]);
      $aux3 = explode(",", $aux2[1]);
      $coord = [$aux2[0],$aux3[0]];
      //Link to center the view on the street
      echo "<div class='street'><div class='directions' onclick='centerStreet("
      .$coord[0].",".$coord[1].",false)'>".$row[2]." ".$row[0]."</div></div>";
    }
  }
  echo "</div>";
}
?>
