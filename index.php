<?php
	if(isset($_SESSION['user_name'])) {
		session_start();
   		//header('location: load_skeleton.php');
	}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>
			watermelon!
		</title>
		<link type="text/css" rel="stylesheet" href="common.css">
		<link type="text/css" rel="stylesheet" href="authentication.css">
		<link type="text/css" rel="stylesheet" href="style.css">
		<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>-->
		<script>
			let resources = 1;
		</script>
	</head>
	<body>
		<div id = "container">
			<div class = "card">
				<input type="text" class="text" id="log_in_user_name">
				<input type="text" class="text" id="log_in_pass_word">
				<div class="button" id="button_log_in"> log in </div>
			</div>
			<div class = "card">
				<input type="text" class="text" id ="sign_up_user_name">
				<input type="text" class="text" id ="sign_up_pass_word">
				<input type="text" class="text" id ="first_name">
				<input type="text" class="text" id="last_name">
				<div class="button" id="button_sign_up"> sign up </div>
			</div>
		</div>

		<script src="clicked_load_menus.js"></script>
		<script src="a1.js"></script>
	</body>
</html>
