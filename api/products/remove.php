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

$id = $_REQUEST['id'];

$conn->query("DELETE * FROM products WHERE id=$id;");

$obj = $conn->error;
if (!$obj){
    echo 'success!';
}else{
    echo($obj);
}

$conn->close();
?>
