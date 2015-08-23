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
    @$id = $request->id;
    @$name = $request->name;
    @$subname = $request->subname;
    @$brand = $request->brand;
    @$main_cat = $request->main_cat;
    @$sub_cat = $request->sub_cat;
    @$slug = "slug";
    @$price = $request->price;
    @$promo = $request->promo;
    @$promo_price = $request->promo_price;
    @$promo_stock = $request->promo_stock;
    @$promo_end = $request->propmo_end;
    @$excerpt = $request->excerpt;
    @$desc = $request->description;
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
