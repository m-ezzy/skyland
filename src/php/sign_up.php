<?php
	require 'server.php';

	$user_name = $_POST['user_name'];
	$pass_word = $_POST['pass_word'];

	$first_name = $_POST['first_name'];
	$last_name = $_POST['last_name'];

	$query = "INSERT INTO accounts(user_name,pass_word,first_name,last_name) VALUES('$user_name','$pass_word','$first_name','$last_name')";
	$conn->query($query);

	$user_id = $conn->insert_id;

	$query = "INSERT INTO peer_id(user_id) VALUES($user_id)";
	$conn->query($query);

	//creating chat between itself
	$query = "INSERT INTO chats(user_id1,user_id2) VALUES($user_id,$user_id)";
	$conn->query($query);

	$_SESSION['user_id'] = $user_id;
	$_SESSION['user_name'] = $user_name;

	header('location: ../../index.php');
?>
