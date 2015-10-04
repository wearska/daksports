<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$code = $request->code;
    @$name = $request->name;
    @$subname = $request->subname;
    @$brand = $request->brand;
    @$type = $request->type;
    @$kind = $request->kind;
    @$slug = "slug";
    @$price = $request->price;
    @$promo = $request->promo;
    @$promo_price = $request->promo_price;
    @$promo_stock = $request->promo_stock;
    @$promo_end = $request->promo_end;
    @$excerpt = $request->excerpt;
    @$desc = $request->description;
    $desc = $conn->real_escape_string($desc);
    @$sizes = serialize($request->sizes);
    @$tags = serialize($request->tags);
    @$added = $request->added;
    @$file1 = $request->file1;
    @$file2 = $request->file2;
    @$file3 = $request->file3;
    @$file4 = $request->file4;
    @$file5 = $request->file5;

$sql = "INSERT INTO products (code, name, subname, brand, type, kind, tags, price, promo, promo_price, promo_stock, promo_end, excerpt, description, sizes, added, file1, file2, file3, file4, file5) VALUES ('$code', '$name', '$subname', '$brand', '$type', '$kind', '$tags', '$price', '$promo', '$promo_price', '$promo_stock', '$promo_end', '$excerpt', '$desc', '$sizes', '$added', '$file1', '$file2', '$file3', '$file4', '$file5')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
