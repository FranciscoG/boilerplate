<?php
  $addBodyAttribs = "";
  
  if (!empty($bodyAttributes)) {
   
    foreach ($bodyAttributes as $key => $value) {
      $addBodyAttribs .= $key . '="' . $value . '" ';
    }
  }

?>
<!doctype html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>

        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="css/app.css">
        <script src="js/vendor/modernizr.custom.js"></script>
    </head>

    <body <?=$addBodyAttribs;?>>
      <div class="container">
        <header>
          
        </header>

          <div class="main">