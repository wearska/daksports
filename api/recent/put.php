<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$uid = $request->uid;
    @$recent = $request->recent;

$sql = "UPDATE `users` SET `recent`='$recent' WHERE `uid`='$uid';";

if ($conn->query($sql) === TRUE) {
    echo "User recent saved sucessfuly";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
