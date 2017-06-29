<?php
//This php file will insert a new comment in the database
$supuser = 'postgres';
$passwd = '*******';
$db = 'tfm';
$port = 5432;
$host = 'localhost';
//Establishing connection with the database
$strCnx = "host=$host port=$port dbname=$db user=$supuser password=$passwd";
$cnx = pg_connect($strCnx) or die ("Connection error. ". pg_last_error());
//Data from the new comment
$user = $_REQUEST["u"]; //Name of the user
$comment = $_REQUEST["c"]; // Text of the comment
$pto = $_REQUEST["p"]; //Coordinates on the map
if ($user != ''){
  //If the user put the name
  pg_query($cnx, "INSERT INTO comments (geom, owner, comment)
          VALUES (ST_SetSRID(ST_MakePoint($pto), 3857), '$user', '$comment');");
} else {
  //If the user does not put the name, the name will be Anonymous
  pg_query($cnx, "INSERT INTO comments (geom, comment)
          VALUES (ST_SetSRID(ST_MakePoint($pto), 3857), '$comment');");
}
?>
