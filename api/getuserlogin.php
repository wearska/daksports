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

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$email = $request->email;
@$password = $request->password;

$res = $conn->query("SELECT password FROM users WHERE email='$email';");

$pwd = '';
$result = 'false';

if ($res->num_rows > 0) {
    // output data of each row
    while($row = $res->fetch_assoc()) {
        $pwd = $row["password"];
    }
} else {
    echo "0 results";
}

if ($pwd == $password){
    $result = 'true';
} else{
    $result = 'false';
}

echo $result;
// echo ($pwd . ' / ' . $password);

$conn->close();
?>
