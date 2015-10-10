<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$uid = $request->userid;
    @$listid = $request->listid;
    @$added = $request->added;
    @$listname = $request->listname;
    @$active = $request->active;
    @$incart = $request->incart;
    @$items = $request->items;

$sql = "INSERT INTO shopping_lists (id, userid, added, name, active, in_cart, items)
VALUES ('$listid', '$uid', '$added', '$listname', '$active', '$incart', '$items');";

if ($conn->query($sql) === TRUE) {
    echo "list added to db successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
