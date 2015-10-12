<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$uid = $request->uid;
    @$email = $request->email;
    @$created = $request->created;
    @$first_name = $request->first_name;
    @$last_name = $request->last_name;
    @$birthday = $request->birthday;
    @$gender = $request->gender;
    @$user_photo = $request->user_photo;
    @$shoe_size = $request->shoe_size;
    @$top_size = $request->top_size;
    @$pants_size = $request->pants_size;
    @$addresses = $request->addresses;
    @$businesses = $request->businesses;
    @$subscriptions = $request->subscriptions;
    @$defaults = $request->defaults;

$sql = "INSERT INTO users (uid, email, first_name, last_name, created, user_photo)
VALUES ('$uid', '$email', '$first_name', '$last_name', '$created', '$user_photo')";

if ($conn->query($sql) === TRUE) {
    echo "New user created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
