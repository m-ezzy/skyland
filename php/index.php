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
	<title> fruits! </title>
		
	<link rel="icon" href="../media/images/icon2.ico">

	<!--
	<link type="text/css" rel="stylesheet" href="common.css">
	<link type="text/css" rel="stylesheet" href="authentication.css">
	<link type="text/css" rel="stylesheet" href="s_home.css">
	-->

	<link type="text/css" rel="stylesheet" href="../css/common.css">
	<link type="text/css" rel="stylesheet" href="../css/home.css">
	<link type="text/css" rel="stylesheet" href="../css/chats.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

	<script>
		let resources = 1;
	</script>
</head>
<body>
	<div id='container'>
		<div id='menu_bar'>
			<!-- all of this can be div tags instead of input button -->
			<input type="button" onclick='load_home()' value='home'>
			<input type="button" onclick='load_frequent()' value='frequent'>
			<button onclick='load_chats()'> chats </button>
			<button onclick='load_groups()'> groups </button>
			<button onclick='load_channels()'> channels </button>
			<!--<div class='menu' onclick='load_games()'> Games </div>
			<div class='menu' onclick='load_market()'> Market </div>-->
			<button id='theme' onclick='toggle_theme()'> theme </button>
		</div>
		<div id='content'></div>
	</div>
	
	<script src="../js/main.js"></script>
	<script src="../js/menus.js"></script>
	<script src="../js/messages.js"></script>
	<script src="../js/privacy.js"></script>
</body>
</html>
