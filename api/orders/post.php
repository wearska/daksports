<?php

// require config file
require_once('../config.php');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
    @$id = $request->id;
    @$userid = $request->userid;
    @$billing = $request->billing;
    @$payment = $request->payment;
    @$discount = $request->discount;
    @$card = $request->card;
    @$shipping = $request->shipping;
    @$items = $request->items;
    @$products = $request->products;
    @$added = $request->added;
    @$contact = $request->contact;
    @$total = $request->total;

$sql = "INSERT INTO orders (id, userid, billing, payment, discount, card, shipping, items, products, total, added, contact)
VALUES ('$id', '$userid', '$billing', '$payment', '$discount', '$card', '$shipping', '$items', '$products', '$total', '$added', '$contact');";

if ($conn->query($sql) === TRUE) {
    echo "Comanda inregistrata";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
