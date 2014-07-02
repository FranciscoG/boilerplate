<?php
  $addBodyAttribs = "";
  
  if (!empty($bodyAttributes)) {
   
    foreach ($bodyAttributes as $key => $value) {
      $addBodyAttribs .= $key . '="' . $value . '" ';
    }
  }
  if (empty($meta) || !isset($meta['title'])) {
    // set a basic page title if meta or page title not set
    $meta = array("title" => "My Boiler Plate");
  }

?>
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title><?=$meta['title'];?></title>

        <?php if (isset($meta["keywords"])) : ?>
          <meta name="keywords" content="<?=$meta['keywords'];?>">
        <?php endif;
              if (isset($meta["description"])) : ?>
          <meta name="description" content="<?=$meta['description'];?>">
        <?php endif; ?>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="css/app.css">
        <!--[if lt IE 9]><script src="js/vendor/selectivizr-min.js"></script><![endif]-->
        <script src="js/vendor/modernizr.custom.js"></script>
    </head>

    <body <?=$addBodyAttribs;?>>
      <div class="container">

        <?php include('inc/header.php'); ?>
        <?php include('inc/nav.php'); ?>

          <main>