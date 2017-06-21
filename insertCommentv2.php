<?php
$supuser = 'postgres';
$passwd = '*******';
$db = 'tfm';
$port = 5432;
$host = 'localhost';
$strCnx = "host=$host port=$port dbname=$db user=$supuser password=$passwd";
$cnx = pg_connect($strCnx) or die ("Connection error. ". pg_last_error());
$user = $_REQUEST["u"];
$comment = $_REQUEST["c"];
$pto = $_REQUEST["p"];
if ($user != ''){
  pg_query($cnx, "INSERT INTO comments (geom, owner, comment) VALUES (ST_SetSRID(ST_MakePoint($pto), 3857), '$user', '$comment');");
  //echo 'Con user';
} else {
  pg_query($cnx, "INSERT INTO comments (geom, comment) VALUES (ST_SetSRID(ST_MakePoint($pto), 3857), '$comment');");
  //echo 'Sin user';
}
?>
