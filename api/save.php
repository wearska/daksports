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
    @$img1 = $request->img1;
    @$img2 = $request->img2;
    @$img3 = $request->img3;
    @$img4 = $request->img4;
    @$img5 = $request->img5;

$sql = "INSERT INTO products (name, subname, slug, price, excerpt, description, inv, added, img1, img2, img3, img4, img5)
VALUES ('$name', '$subname', '$slug', '$price', '$excerpt', '$desc', '$inv', '$added', '$img1', '$img2', '$img3', '$img4', '$img5')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
