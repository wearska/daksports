<?php

// require config file
require_once('../config.php');

$id = $_REQUEST['id'];

$conn->query("DELETE * FROM products WHERE id=$id;");

$obj = $conn->error;
if (!$obj){
    echo 'success!';
}else{
    echo($obj);
}

$conn->close();
?>
