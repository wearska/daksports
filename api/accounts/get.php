<?php

// require config file
require_once('../config.php');

$uid= $_GET['uid'];
$res = $conn->query("SELECT * FROM users WHERE uid='$uid';");
$conn->close();
$result = array();

while($row=mysqli_fetch_assoc($res)){
        if($row['admin'] == '1'){
                $row['admin'] = true;
            }else{
                $row['admin'] = false;
            };
        if($row['gender'] == 2){
                $row['gender'] = 'feminin';
            }else if($row['gender'] == 1){
                $row['gender'] = 'masculin';
            };
        if($row['addresses'] !== false){
                $row['addresses'] = unserialize($row['addresses']);
            };
        if($row['subscriptions'] !==false){
                $row['subscriptions'] = unserialize($row['subscriptions']);
            };
        $result[] = $row;
    }

$obj = json_encode($result);

echo ($obj);
?>
