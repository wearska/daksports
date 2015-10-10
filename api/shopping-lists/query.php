<?php

// require config file
require_once('../config.php');

$uid= $_GET['uid'];

$res = $conn->query("SELECT * FROM shopping_lists WHERE userid='$uid';");
$conn->close();
$result = array();

while($row=mysqli_fetch_assoc($res)){
        $result[] = $row;
    }
$obj = json_encode($result);

echo($obj);
?>
