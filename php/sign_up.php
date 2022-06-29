<?php
	require 'server.php';

	$user_name = '';
	$pass_word = '';

	$first_name = '';
	$last_name = '';

	$errors = array();
	$_SESSION['success'] = '';

	// Data sanitization to prevent SQL injection
	$user_name = mysqli_real_escape_string($conn, $_POST['user_name']);
	$pass_word = mysqli_real_escape_string($conn, $_POST['pass_word']);

	$first_name = mysqli_real_escape_string($conn, $_POST['first_name']);
	$last_name = mysqli_real_escape_string($conn, $_POST['last_name']);


	//$user_name = strtolower($user_name);

	$query = "INSERT INTO accounts(user_name,pass_word) VALUES('" . $user_name . "','" . $pass_word . "')";
	$conn->query($query);

	$query = "INSERT INTO user_info(user_name,first_name,last_name) VALUES('" . $user_name . "','" . $first_name . "','" . $last_name . "')";
	$conn->query($query);

	$query = "CREATE TABLE chats_" . $user_name . " (user_name VARCHAR(20) DEFAULT NULL, PRIMARY KEY(user_name))";
	$conn->query($query);

	//creating chat between itself
	$query = "CREATE TABLE chat_between_$user_name" . "_$user_name (ROWNUM int(20),sent_by varchar(20),message varchar(500),time DATETIME(2) DEFAULT CURRENT_TIMESTAMP)";
	$conn->query($query);

	$query = "INSERT INTO chats_$user_name(user_name) VALUES('" . $user_name . "')";
	$conn->query($query);

	$_SESSION['user_name'] = $user_name;

	header('location: index.php');
?>
