<?php
// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "daksports";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$userid= $_GET['userid'];

$userfavs = $conn->query("SELECT productid FROM favourites WHERE userid='$userid';");

$array = array();
while ($row = mysqli_fetch_array($userfavs)) {
    $array[] = $row['productid'];
}
echo json_encode($array);
$conn->close();
?>
