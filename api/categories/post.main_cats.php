<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$main_cat = $request->main_cat;

$sql = "INSERT INTO main_cats (main_cat) VALUES ('$main_cat')";

if ($conn->query($sql) === TRUE) {
    echo "New category created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
