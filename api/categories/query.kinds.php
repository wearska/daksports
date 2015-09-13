<?php

// require config file
require_once('../config.php');

$res = $conn->query("SELECT * FROM kinds;");


$array = array();
while ($row = mysqli_fetch_array($res)) {
    $array[] = $row['kind'];
}
echo json_encode($array);

$conn->close();
?>
