<?php

if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $tempPath = preg_replace('/\s+/', '_', $tempPath);
    $filename = $_FILES[ 'file' ][ 'name' ];
    $filename = preg_replace('/\s+/', '_', $filename);
    $ydir = $_POST['year'];
    $mdir = $_POST['month'];
    $id = $_POST['id'];
    $root = $_SERVER['DOCUMENT_ROOT']; 
    $baseDir = $root . DIRECTORY_SEPARATOR . 'uploads';
    if (!file_exists($baseDir . DIRECTORY_SEPARATOR . $ydir . DIRECTORY_SEPARATOR . $mdir . DIRECTORY_SEPARATOR . $id)) {
        mkdir($baseDir . DIRECTORY_SEPARATOR . $ydir . DIRECTORY_SEPARATOR . $mdir . DIRECTORY_SEPARATOR . $id, 0777, true);
    }
    $uploadPath = $root . DIRECTORY_SEPARATOR . 'uploads'. DIRECTORY_SEPARATOR .  $ydir . DIRECTORY_SEPARATOR . $mdir . DIRECTORY_SEPARATOR . $id . DIRECTORY_SEPARATOR . $filename;

    move_uploaded_file( $tempPath, $uploadPath );

    echo "Done";

} else {

    echo 'No files';

}

?>