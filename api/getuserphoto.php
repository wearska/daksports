<?php
// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json; charset=UTF-8");

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

$email= $_GET['email'];
$res = $conn->query("SELECT * FROM users WHERE email='$email';");
$conn->close();
$result = array();

while($row=mysqli_fetch_assoc($res)){
        $result[] = $row;
    }
$obj = json_encode($result);

echo($obj);
?>
