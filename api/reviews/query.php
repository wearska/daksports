<?php

// require config file
require_once('../config.php');

$res = $conn->query("SELECT * FROM reviews WHERE published = 1");
$conn->close();
$result = array();

while($row=mysqli_fetch_assoc($res)){
        $result[] = $row;
        if($row['review'] !== ''){
            $row['review'] = nl2br($row['review']);
        }
    }
$obj = json_encode($result);

echo($obj);
?>
