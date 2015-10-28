<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$brand = $request->brand;
    $brand = $conn->real_escape_string($brand);

$sql = "INSERT INTO brands (brand_name) VALUES ('$brand')";

if ($conn->query($sql) === TRUE) {
    echo "New category created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
