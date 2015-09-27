<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$userid = $request->userid;
    @$code = $request->code;

$sql = "INSERT INTO favourites (userid, code)
VALUES ('$userid', '$code')";

if ($conn->query($sql) === TRUE) {
    echo "New item added to favourites";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
