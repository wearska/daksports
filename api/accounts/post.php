<?php
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "daksports";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$uid = $request->uid;
    @$email = $request->email;
    @$first_name = $request->first_name;
    @$last_name = $request->last_name;
    @$created = $request->created;
    @$user_photo = $request->user_photo;

$sql = "INSERT INTO users (uid, email, first_name, last_name, created, user_photo)
VALUES ('$uid', '$email', '$first_name', '$last_name', '$created', '$user_photo')";

if ($conn->query($sql) === TRUE) {
    echo "New user created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>