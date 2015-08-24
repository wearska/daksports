<?php

// require config file
require_once('../config.php');

$res = $conn->query("SELECT * FROM brands;");


$array = array();
while ($row = mysqli_fetch_array($res)) {
    $array[] = $row['brand_name'];
}
echo json_encode($array);

$conn->close();
?>
