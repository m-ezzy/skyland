<?php
	require 'server.php';

	$UserName = '';
	$PassWord = '';

	$FirstName = '';
	$LastName = '';

	$errors = array();
	$_SESSION['success'] = '';

	// Data sanitization to prevent SQL injection
	$UserName = mysqli_real_escape_string($conn, $_POST['UserName']);
	$PassWord = mysqli_real_escape_string($conn, $_POST['PassWord']);

	$FirstName = mysqli_real_escape_string($conn, $_POST['FirstName']);
	$LastName = mysqli_real_escape_string($conn, $_POST['LastName']);


	$UserName = strtolower($UserName);

	$query = "INSERT INTO accounts(user_name,pass_word) VALUES('" . $user_name . "','" . $pass_word . "')";
	mysqli_query($conn, $query);

	$query = "INSERT INTO user_info(UserName,FirstName,LastName) VALUES('" . $UserName . "','" . $FirstName . "','" . $LastName . "')";
	mysqli_query($conn, $query);

	$query = "CREATE TABLE chats_" . $UserName . " (user varchar(20))";
	mysqli_query($conn, $query);

	//creating chat between itself
	$query = "CREATE TABLE chat_between_$UserName" . "_$UserName (ROWNUM int(20),sent_by varchar(20),message varchar(500),time DATETIME(2) DEFAULT CURRENT_TIMESTAMP)";
	mysqli_query($conn, $query);

	$query = "INSERT INTO chats_$UserName(user) VALUES('" . $UserName . "')";
	mysqli_query($conn, $query);

	$_SESSION['UserName'] = $UserName;
	$_SESSION['success'] = "You have logged in!";

	header('location: index.php');
?>
