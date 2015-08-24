<?php

// require config file
require_once('../config.php');

$userid= $_GET['uid'];

$userfavs = $conn->query("SELECT productid FROM favourites WHERE userid='$userid';");

$array = array();
while ($row = mysqli_fetch_array($userfavs)) {
    $array[] = $row['productid'];
}
echo json_encode($array);
$conn->close();
?>
