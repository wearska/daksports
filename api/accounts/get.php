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
            }else if($row['gender'] == 0){
                $row['gender'] = '';
            };
        $result[] = $row;
    }

$obj = json_encode($result);

echo ($obj);
?>
