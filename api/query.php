<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "password", "daksports");

$result = $conn->query("SELECT * FROM products");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($result);
?>