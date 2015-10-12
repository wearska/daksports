<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$uid = $request->uid;
    @$first_name = $request->first_name;
    @$last_name = $request->last_name;
    @$birthday = $request->birthday;
    @$gender = $request->gender;
    @$user_photo = $request->user_photo;
    @$shoe_size = $request->shoe_size;
    @$top_size = $request->top_size;
    @$pants_size = $request->pants_size;
    @$addresses = serialize($request->addresses);
    @$subscriptions = serialize($request->subscriptions);

$sql = "UPDATE `users` SET `first_name`='$first_name', `last_name`='$last_name', `birthday`='$birthday', `gender`='$gender', `user_photo`='$user_photo', `shoe_size`='$shoe_size', `top_size`='$top_size', `pants_size`='$pants_size', `addresses`='$addresses', `subscriptions`='$subscriptions' WHERE `uid`='$uid';";

if ($conn->query($sql) === TRUE) {
    echo "User details saved sucessfuly";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
