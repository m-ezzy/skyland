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
	<title> skyland! </title>

	<!--<link rel="icon" href="../../media/images/icon2.ico">-->

	<!--
	<link type="text/css" rel="stylesheet" href="common.css">
	<link type="text/css" rel="stylesheet" href="authentication.css">
	<link type="text/css" rel="stylesheet" href="s_home.css">
	-->

	<link type="text/css" rel="stylesheet" href="../css/style.css">
	<link type="text/css" rel="stylesheet" href="../css/home.css">

	<link type="text/css" rel="stylesheet" href="../css/common.css">
	<link type="text/css" rel="stylesheet" href="../css/chats.css">
	<link type="text/css" rel="stylesheet" href="../css/groups.css">

	<link type="text/css" rel="stylesheet" href="../css/channels.css">
	<link type="text/css" rel="stylesheet" href="../css/games.css">
	<link type="text/css" rel="stylesheet" href="../css/market.css">



	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>-->

	<script>
		let resources = 1;
	</script>
</head>
<body>
	<div id='container'>
		<div id='menu_bar'>
			<!-- all of this can be div tags instead of input button -->
			<!--<input type="button" onclick='load_home()' value='home'>
			<input type="button" onclick='load_frequent()' value='frequent'>-->

			<div class='button' onclick='load_home(this)'> home </div>
			<div class='button' onclick='load_chats(this)'> chats </div>
			<div class='button' onclick='load_groups(this)'> groups </div>
			<div class='button' onclick='load_channels(this)'> channels </div>
			<div class='button' onclick='load_games(this)'> games </div>
			<div class='button' onclick='load_market(this)'> market </div>
			
			<!--
			<div class='menu' onclick='load_games()'> Games </div>
			<div class='menu' onclick='load_market()'> Market </div>
			<button id='theme' onclick='toggle_theme()'> theme </button>
			-->
			<div class='button' id='button_theme' onclick='toggle_theme(this)'> theme </div>
		</div>
		
		<div class='content' id='content_home'></div>
		<div class='content' id='content_chats'></div>
		<div class='content' id='content_groups'></div>
		<div class='content' id='content_channels'></div>
		<div class='content' id='content_games'></div>
		<div class='content' id='content_market'></div>

		<div class='ba' id='ba1'></div>
		<div class='ba' id='ba2'></div>
		<div class='ba' id='ba3'></div>
		<div class='ba' id='ba4'></div>
		<div class='ba' id='ba5'></div>
	</div>
	
	<script src="../js/main.js"></script>

	<script src="../js/home.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/chats.js"></script>
	<script src="../js/groups.js"></script>
	<script src="../js/channels.js"></script>
	<script src="../js/games.js"></script>
	<script src="../js/market.js"></script>

	<script src="../js/others.js"></script>
	<script src="../js/privacy.js"></script>
</body>
</html>
