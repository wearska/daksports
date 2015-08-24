<?php

// require config file
require_once('../config.php');

$id = $_GET['id'];

$res = $conn->query("SELECT * FROM products WHERE id=$id");
$conn->close();
$result = array();

while($row=mysqli_fetch_assoc($res)){
        $result[] = $row;
    }
$obj = json_encode($result);

echo($obj);
?>
