<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$rating = $request->rating;
    @$title = $request->title;
    @$review = $request->body;
    $review = $conn->real_escape_string($review);
    @$added = $request->added;
    @$userid = $request->userid;
    @$code = $request->code;

$sql = "INSERT INTO reviews (rating, code, title, review, userid, added) VALUES ('$rating', '$code', '$title', '$review', '$userid', '$added')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
