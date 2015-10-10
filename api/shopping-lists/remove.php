<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$listid = $request->listid;

$sql = "DELETE FROM shopping_lists WHERE `id`='$listid';";

if ($conn->query($sql) === TRUE) {
    echo "list removed successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
