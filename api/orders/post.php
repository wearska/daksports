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
$id = $request->id;

// $sql = "INSERT INTO orders (name, subname, price, excerpt, description, inv, added, file1, file2, file3, file4, file5)
// VALUES ('$name', '$subname', '$price', '$excerpt', '$desc', '$inv', '$added', '$file1', '$file2', '$file3', '$file4', '$file5')";

// if ($conn->query($sql) === TRUE) {
//     echo "Item added to cart";
// } else {
//     echo "Error: " . $sql . "<br>" . $conn->error;
// }

echo($id);

$conn->close();
?>
