<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$userid = $request->uid;
    @$productid = $request->productid;

$sql = "INSERT INTO favourites (userid, productid)
VALUES ('$userid', '$productid')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
