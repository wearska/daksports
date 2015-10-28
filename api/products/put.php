<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$code = $request->code;
    @$name = $request->name;
    $name = $conn->real_escape_string($name);
    @$subname = $request->subname;
    $subname = $conn->real_escape_string($subname);
    @$brand = $request->brand;
    $brand = $conn->real_escape_string($brand);
    @$type = $request->type;
    @$kind = $request->kind;
    @$slug = "slug";
    @$price = $request->price;
    @$promo = $request->promo;
    @$promo_price = $request->promo_price;
    @$promo_stock = $request->promo_stock;
    @$promo_end = $request->promo_end;
    @$excerpt = $request->excerpt;
    $excerpt = $conn->real_escape_string($excerpt);
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

$sql = "UPDATE `products` SET `name`='$name', `subname`='$subname', `price`='$price', `promo`='$promo', `promo_price`='$promo_price', `promo_stock`='$promo_stock', `promo_end`='$promo_end', `excerpt`='$excerpt', `description`='$desc', `sizes`='$sizes', `brand`='$brand', `type`='$type', `kind`='$kind', `tags`='$tags', `file1`='$file1', `file2`='$file2', `file3`='$file3', `file4`='$file4', `file5`='$file5', `added`='$added' WHERE `code`='$code';";

if ($conn->query($sql) === TRUE) {
    echo "Product modified sucessfuly";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
