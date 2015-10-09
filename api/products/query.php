<?php

// require config file
require_once('../config.php');

$res = $conn->query("SELECT * FROM products");
$conn->close();
$result = array();

while($row=mysqli_fetch_assoc($res)){
        if($row['tags'] !== false){
            $row['tags'] = unserialize($row['tags']);
        };
        if($row['sizes'] !==false){
            $row['sizes'] = unserialize($row['sizes']);
        };
        if($row['gender'] == 2){
                $row['gender'] = 'feminin';
            }else if($row['gender'] == 1){
                $row['gender'] = 'masculin';
            };
        if($row['description'] !== ''){
            $row['edit_description'] = $row['description'];
            $row['description'] = nl2br($row['description']);
            
        }
        $result[] = $row;
    }
$obj = json_encode($result);

echo($obj);
?>
