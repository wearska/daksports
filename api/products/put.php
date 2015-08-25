<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$id = $request->id;
    @$name = $request->name;
    @$subname = $request->subname;
    @$brand = $request->brand;
    @$main_cat = $request->main_cat;
    @$sub_cat = $request->sub_cat;
    @$tags = $request->tags;
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

$sql = "UPDATE `products` SET `name`='$name', `subname`='$subname', `price`='$price', `promo`='$promo', `promo_price`='$promo_price', `promo_stock`='$promo_stock', `promo_end`='$promo_end', `excerpt`='$excerpt', `description`='$desc', `inv`='$inv', `brand`='$brand', `main_cat`='$main_cat', `sub_cat`='$sub_cat', `tags`='$tags', `file1`='$file1', `file2`='$file2', `file3`='$file3', `file4`='$file4', `file5`='$file5', `added`='$added' WHERE `id`='$id';";

if ($conn->query($sql) === TRUE) {
    echo $promo_end;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
