<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$userid = $request->userid;
    @$code = $request->code;

$sql = "DELETE FROM favourites WHERE userid='$userid' AND code='$code'";

if ($conn->query($sql) === TRUE) {
    echo "Fav item removed sucessfuly";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
