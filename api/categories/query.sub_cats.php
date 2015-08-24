<?php

// require config file
require_once('../config.php');

$res = $conn->query("SELECT parent_cat, sub_cat FROM sub_cats;");


$array = array();
while ($row = mysqli_fetch_array($res)) {
    $array[] = $row['sub_cat'];
}
echo json_encode($array);

$conn->close();
?>
