<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
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
    @$promo_end = $request->promo_end;
    @$excerpt = $request->excerpt;
    @$desc = $request->description;
    @$inv = $request->inv;
    @$added = $request->added;
    @$file1 = $request->file1;
    @$file2 = $request->file2;
    @$file3 = $request->file3;
    @$file4 = $request->file4;
    @$file5 = $request->file5;

$sql = "INSERT INTO products (name, subname, brand, main_cat, sub_cat, price, promo, promo_price, promo_stock, promo_end, excerpt, description, inv, added, file1, file2, file3, file4, file5) VALUES ('$name', '$subname', '$brand', '$main_cat', '$sub_cat', '$price', '$promo', '$promo_price', '$promo_stock', '$promo_end', '$excerpt', '$desc', '$inv', '$added', '$file1', '$file2', '$file3', '$file4', '$file5')";

$response = "SELECT LAST_INSERT_ID();";

if ($conn->query($sql) === TRUE) {
    // echo "New record created successfully";
    $res = $conn->query($response);
    while($row=mysqli_fetch_array($res)){
            $result = $row['LAST_INSERT_ID()'];
        }
    echo($result);
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
