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
    @$firstName = $request->firstName;
    @$lastName = $request->lastName;
    @$email = $request->email;
    @$password = $request->password;
    @$photo = '/uploads/userpics/'. $email . '/' . $request->photo;

echo($postdata);
$sql = "INSERT INTO users (first_name, last_name, email, password, user_photo)
VALUES ('$firstName', '$lastName', '$email', '$password', '$photo')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
