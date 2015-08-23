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

$uid= $_GET['uid'];
$res = $conn->query("SELECT * FROM users WHERE uid='$uid';");

$result = array();

while($row=mysqli_fetch_assoc($res)){
        $result[] = $row;
        if($result[0]['admin'] == '1'){
            $result[0]['admin'] = true;
        }else{
            $result[0]['admin'] = false;
        }
    }
    
$obj = json_encode($result);

echo ($obj);

$conn->close();
?>
