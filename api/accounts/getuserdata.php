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

$result = array();

if ($res->num_rows > 0) {
    // output data of each row
    while($row=mysqli_fetch_assoc($res)){
            $result[] = $row;
        }
    unset($result[0]['password']);
    if($result[0]['admin'] == '1'){
        $result[0]['admin'] = true;
    }else{
        unset($result[0]['admin']);
    }
    $obj = json_encode($result[0]);
} else {
    $result[] = null;
    $obj = null;
}
echo($obj);

$conn->close();
?>
