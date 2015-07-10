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
    @$name = $request->name;
    @$subname = $request->subname;
    @$slug = "slug";
    @$price = $request->price;
    @$excerpt = $request->excerpt;
    @$desc = $request->desc;
    @$inv = $request->inv;
    @$added = $request->added;
    @$file1 = $request->file1;
    @$file2 = $request->file2;
    @$file3 = $request->file3;
    @$file4 = $request->file4;
    @$file5 = $request->file5;

$sql = "INSERT INTO products (name, subname, price, excerpt, description, inv, added, file1, file2, file3, file4, file5)
VALUES ('$name', '$subname', '$price', '$excerpt', '$desc', '$inv', '$added', '$file1', '$file2', '$file3', '$file4', '$file5')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
