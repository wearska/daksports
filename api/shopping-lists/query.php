<?php

// require config file
require_once('../config.php');

$uid= $_GET['uid'];

$res = $conn->query("SELECT list FROM shopping_lists WHERE userid='$uid';");
$conn->close();
$result = array();

while($row=mysqli_fetch_assoc($res)){
        if($row['list'] !== false){
            $row['list'] = unserialize($row['list']);
        };
        $result[] = $row;
    }
$obj = json_encode($result);

echo($obj);
?>
