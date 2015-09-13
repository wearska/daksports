<?php

// require config file
require_once('../config.php');

$res = $conn->query("SELECT * FROM types;");

$result = array();

while($row=mysqli_fetch_assoc($res)){
        $result[] = $row;
    }
$obj = json_encode($result);

echo($obj);

$conn->close();
?>
