<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$type = $request->type;
    @$short = $request->short;

$sql = "INSERT INTO types (type, short) VALUES ('$type', '$short')";

if ($conn->query($sql) === TRUE) {
    echo "New category created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
