<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$sub_cat = $request->sub_cat;

$sql = "INSERT INTO sub_cats (sub_cat) VALUES ('$sub_cat')";

if ($conn->query($sql) === TRUE) {
    echo "New category created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
