<?php

// require config file
require_once('../config.php');

$uid= $_GET['uid'];

$res = $conn->query("SELECT * FROM shopping_lists WHERE userid='$uid';");
$conn->close();
$result = array();

while($row=mysqli_fetch_assoc($res)){
        $row['active'] = (int)$row['active'];
        $row['in_cart'] = (int)$row['in_cart'];
        $result[] = $row;
    }
$obj = json_encode($result);

echo($obj);
?>
