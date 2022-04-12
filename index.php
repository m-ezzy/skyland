<?php
	if (!isset($_SESSION['UserName'])) {
   		header('location: authentication.php');
	} else {
		require 'server.php';
		session_start();
	}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>
			watermelon!
		</title>
		<link type="text/css" rel="stylesheet" href="style.css">
		<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>-->
		<script>
			let server = "<?php echo $server_name?>"
			//server = "e";
		</script>
	</head>
	<body>
		<div id="MenuBar"> <!--sider/sideheader/navigator-->
			<div class="Menu" onclick="SelectedMenuHome()">Home</div>
			<div class="Menu" onclick="SelectedMenuChats()">Chats</div>
			<div class="Menu">Groups</div>
			<div class="Menu">Communities</div>
			<div class="Menu">Games</div>
			<div class="Menu">Market</div>
			<div class="Menu" id="ButtonTheme" onclick="ToggleTheme()">Theme</div>
		</div>
		<div id="Container">
			<!--
			<div id="ChatList">
				<div id="NewChat" onclick="SelectedNewChat()"></div>
			</div>
			<div id="MessagesList" /*onmouseover="showName(this)*/">
			</div>
			<form>
				<input type='text' id='TextNewMessage'>
				<input type='button' value='send' id='ButtonNewMessage' onclick='SendNewMessage()'>
			</form>
			-->
			<!--<div class="content" id="c1"><?/*php echo $_SESSION['username'];*/?></div>-->
		</div>
		<script src="privacy.js"></script>
		<script src="main.js"></script>
	</body>
</html>
