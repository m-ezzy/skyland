<?php
	include 'server.php';
	//require 'server.php';
	//session_start();

	//$UserName = '';
	//$pass_word = '';

	$user_name = $_POST['user_name'];
	$pass_word = $_POST['pass_word'];

	/*
	$UserName = &$_POST['u'];
	$pass_word = &$_POST['p'];
	*/

	$query = "SELECT * FROM accounts WHERE user_name='$user_name' AND pass_word='$pass_word'";
	$result = $conn->query($query);

	if ( $result->num_rows == 0 ) {
		$query = "SELECT * FROM accounts WHERE user_name='$user_name'";
		$result = $conn->query($query);

		if ( $result->num_rows == 0 ) {
			echo "1";
			echo "user name $user_name is incorrect !";
		} else {
			echo "2";
			echo "pass word $pass_word is incorrect !";
		}
	} else {
		//echo "2";
		//session_start();
		//$_SESSION['UserName'] = $UserName;
		$_SESSION['user_name'] = $user_name;

		printf($user_name);
		print($user_name);
		print_r($_SESSION);

		header('location: index.php');
	}
?>
