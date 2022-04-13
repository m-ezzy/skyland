<?php /*include('server.php') */?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Orbitron">
		<link style="text/css" rel="stylesheet" href="style0.css">
	</head>
	<body>
		<div id = "container">
			<div id = "log_in"></div>
				<div id = "log_in_user_name"></div>
				<div id = "log_in_pass_word"></div>
				<div id = "button_log_in"> log in </div>
			<div id = "sign_up">
				<div id = "sign_up_user_name"></div>
				<div id = "pass_word"></div>
				<div id = "pass_word"></div>
				<div id = "pass_word"></div>
				<div id = "button_log_in"> sign up </div>
			</div>
		</div>
		<form method="post" action="signup.php" id="f1">
			UserName : <input type="text" name="UserName" class="textbox"><br>
			PassWord : <input type="text" name="PassWord" class="textbox"><br>
			FirstName : <input type="text" name="FirstName" class="textbox"><br>
			LastName : <input type="text" name="LastName" class="textbox"><br>
			<input type="submit" name="SignUp" value="Sign Up" class="submit">
		</form>
		<form method="post" action="login.php" id="f2">
			UserName   : <input type="text" name="UserName" class="textbox"><br>
			PassWord : <input type="text" name="PassWord" class="textbox"><br>
			<input type="submit" name="LogIn" value="Log In" class="submit">
		</form>
	</body>
</html>
