<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$uid = $request->userid;
    @$listid = $request->listid;
    @$listname = $request->listname;
    @$added = $request->added;
    @$list = serialize($request->list);

$sql = "UPDATE `shopping_lists` SET `list`='$list', `name`='$listname' WHERE `id`='$listid';";


if ($conn->query($sql) === TRUE) {
    echo "list added to db successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
echo($listid);

$conn->close();
?>
