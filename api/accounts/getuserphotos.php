<?php

// require config file
require_once('../config.php');

$res = $conn->query("SELECT uid, user_photo, first_name, last_name FROM users;");
$conn->close();
$result = array();

while($row=mysqli_fetch_assoc($res)){
        $result[] = $row;
    }
$obj = json_encode($result);

echo ($obj);
?>
