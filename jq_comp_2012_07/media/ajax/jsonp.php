<?php

// Encode an arbitrary data structure into a JSON string.
$data = array( 'foo', 'bar', 'baz' );
$json = json_encode( $data );

// Generate appropriate content-type header.
header( 'Content-type: application/json' );

// If a JSONP callback param was passed, wrap the JSON with a JavaScript
// function call, otherwise just return the JSON string.
if ( isset( $_GET['callback'] ) ) {
  echo $_GET['callback'] . "($json)";
} else {
  echo $json;
}

?>