<?php

// require config file
require_once('../config.php');

$res = $conn->query("SELECT * FROM main_cats;");


$array = array();
while ($row = mysqli_fetch_array($res)) {
    $array[] = $row['main_cat'];
}
echo json_encode($array);

$conn->close();
?>
