<?php
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "testdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$company_name = $request->name;
    @$city = $request->city;
    @$country = $request->country;
    echo $company_name;

$sql = "INSERT INTO Customers (CompanyName, City, Country)
VALUES ('$company_name', '$city', '$country')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>