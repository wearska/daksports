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

$id = $_GET['id'];

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

$sql = "UPDATE `products` SET `name`='$name', `subname`='$subname', `price`='$price', `excerpt`='$excerpt', `description`='$desc', `inv`='$inv', `added`='$added', `file1`='$file1', `file2`='$file2', `file3`='$file3', `file4`='$file4', `file5`='$file5'  WHERE `id`='$id';";

if ($conn->query($sql) === TRUE) {
    echo $postdata;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
