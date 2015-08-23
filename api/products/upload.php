<?php

if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $tempPath = preg_replace('/\s+/', '_', $tempPath);
    $filename = $_FILES[ 'file' ][ 'name' ];
    $filename = preg_replace('/\s+/', '_', $filename);
    $ydir = $_POST['year'];
    $mdir = $_POST['month'];
    $baseDir = dirname( __DIR__ ) . DIRECTORY_SEPARATOR . 'uploads';
    if (!file_exists($baseDir . DIRECTORY_SEPARATOR . $ydir . DIRECTORY_SEPARATOR . $mdir)) {
        mkdir($baseDir . DIRECTORY_SEPARATOR . $ydir . DIRECTORY_SEPARATOR . $mdir, 0777, true);
    }
    $uploadPath = dirname( __DIR__ ) . DIRECTORY_SEPARATOR . 'uploads'. DIRECTORY_SEPARATOR .  $ydir . DIRECTORY_SEPARATOR . $mdir . DIRECTORY_SEPARATOR . $filename;

    move_uploaded_file( $tempPath, $uploadPath );

    $answer = array( 'answer' =>dirname( __DIR__ ) . DIRECTORY_SEPARATOR . 'uploads'. DIRECTORY_SEPARATOR .  $ydir . DIRECTORY_SEPARATOR . $mdir . DIRECTORY_SEPARATOR . $filename);
    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}

?>