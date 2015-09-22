<?php 

// require config file
require_once('config.php');

$res = $conn->query("SELECT size, count FROM inventory WHERE code='DAKFTB72898';");

$result = array();

while($row=mysqli_fetch_assoc($res)){
        $result[] = $row;
    }

$obj = json_encode($result);

echo ($obj);

$conn->close();
?>
