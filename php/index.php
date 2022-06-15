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
			fruits!
		</title>
		
		<link rel="icon" href="../media/images/icon.ico">
		
		<!--
		<link type="text/css" rel="stylesheet" href="common.css">
		<link type="text/css" rel="stylesheet" href="authentication.css">
		<link type="text/css" rel="stylesheet" href="s_home.css">
		-->
		
		<link type="text/css" rel="stylesheet" href="../css/style.css">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

		<script>
			let resources = 1;
		</script>
	</head>
	<body>
		<div id = "container"></div>

		<script src="../js/main.js"></script>
		<script src="../js/menus.js"></script>
		<script src="../js/messages.js"></script>
		<script src="../js/privacy.js"></script>
	</body>
</html>
