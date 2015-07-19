<?php

if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $tempPath = preg_replace('/\s+/', '_', $tempPath);
    $filename = $_FILES[ 'file' ][ 'name' ];
    $filename = preg_replace('/\s+/', '_', $filename);
    $uploadPath = dirname( __DIR__ ) . DIRECTORY_SEPARATOR . 'uploads'. DIRECTORY_SEPARATOR .  'userpics' . DIRECTORY_SEPARATOR . $filename;

    move_uploaded_file( $tempPath, $uploadPath );

    $answer = array( $uploadPath );
    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}

?>