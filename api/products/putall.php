<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$sizes = serialize($request->sizes);

$sql = "UPDATE `products` SET `sizes`='$sizes'";

if ($conn->query($sql) === TRUE) {
    echo "Products modified sucessfuly";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
