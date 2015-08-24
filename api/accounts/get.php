<?php 

// require config file
require_once('../config.php');

$uid= $_GET['uid'];
$res = $conn->query("SELECT * FROM users WHERE uid='$uid';");

$result = array();

while($row=mysqli_fetch_assoc($res)){
        $result[] = $row;
        if($result[0]['admin'] == '1'){
            $result[0]['admin'] = true;
        }else{
            $result[0]['admin'] = false;
        }
    }

$obj = json_encode($result);

echo ($obj);

$conn->close();
?>
