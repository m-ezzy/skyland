<?php
	include 'server.php';

	if(!isset($_SESSION['user_name'])) {
   		header('location: authentication.php');
	}
?>

<!--<!DOCTYPE html>-->
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>
			watermelon!
		</title>
		<!--
		<link type="text/css" rel="stylesheet" href="common.css">
		<link type="text/css" rel="stylesheet" href="authentication.css">
		-->
		<link type="text/css" rel="stylesheet" href="style.css">
		<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>-->
		<script>
			let resources = 1;
		</script>
	</head>
	<body>
		<div id = "container">
		</div>

		<script src="menus.js"></script>
		<script src="messages.js"></script>
		<script src="privacy.js"></script>
		<script src="main.js"></script>
	</body>
</html>
