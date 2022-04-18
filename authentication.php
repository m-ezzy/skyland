<?php /*include('server.php') */?>

<!--<!DOCTYPE html>-->
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<title>
			authentication
		</title>

		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Orbitron">
		<link style="text/css" rel="stylesheet" href="a_style_grid.css">
	</head>
	<body>
		<div id = "container">
			<!--
			<div class = "card" id="log_in">
				<input type="text" class="text" id="log_in_user_name">
				<input type="text" class="text" id="log_in_pass_word">
				<div class="button" id="button_log_in"> log in </div>
			</div>
			<div class = "card" id="sign_up">
				<input type="text" class="text" id ="sign_up_user_name">
				<input type="text" class="text" id ="sign_up_pass_word">
				<input type="text" class="text" id ="first_name">
				<input type="text" class="text" id="last_name">
				<div class="button" id="button_sign_up"> sign up </div>
			</div>

			<script src="a_js.js"></script>
		
			-->

			<form method="POST" action="sign_up.php" id="f1">
				UserName : <input type="text" name="UserName" class="text"><br>
				PassWord : <input type="text" name="PassWord" class="text"><br>
				FirstName : <input type="text" name="FirstName" class="text"><br>
				LastName : <input type="text" name="LastName" class="text"><br>
				<input type="submit" name="SignUp" value="Sign Up" class="submit">
			</form>
			<form method="POST" action="log_in.php" id="f2">
				UserName   : <input type="text" name="user_name" class="text"><br>
				PassWord : <input type="text" name="pass_word" class="text"><br>
				<input type="submit" name="LogIn" value="Log In" class="submit">
			</form>
		</div>
	</body>
</html>
