<?php

// require config file
require_once('../config.php');

$email= $_GET['email'];
$res = $conn->query("SELECT * FROM users WHERE email='$email';");

$result = array();

while($row=mysqli_fetch_assoc($res)){
        $result[] = $row;
    }
$obj = json_encode($result);

echo ($obj);

$conn->close();
?>
