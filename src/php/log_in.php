<?php
	include 'server.php';
	//require 'server.php';

	$user_id = '';
	$user_name = $_POST['user_name'];
	$pass_word = $_POST['pass_word'];

	//$query = "SELECT acounts.user_id,accounts.pass_word FROM accounts INNER JOIN user_names ON user_names.user_name='$user_name' WHERE accounts.pass_word='$pass_word'";
	$query = "SELECT user_id,pass_word,user_name FROM accounts WHERE user_name='$user_name' AND pass_word='$pass_word'";
	$result = $conn->query($query);

	if ( $result->num_rows == 0 ) {
		$query = "SELECT * FROM accounts WHERE user_name='$user_name'";
		$result = $conn->query($query);

		if ( $result->num_rows == 0 ) {
			echo "user name $user_name is incorrect !";
		} else {
			echo "pass word $pass_word is incorrect !";
		}
	} else {
		$row = $result->fetch_all(MYSQLI_ASSOC);

		$user_id = $row[0]['user_id'];

		/*
		printf($user_name);
		print($user_name);
		print_r($_SESSION);*/

		$_SESSION['user_id'] = $user_id;
		$_COOKIE['user_id'] = $user_id;
		setcookie('user_id', $user_id);

		$_SESSION['user_name'] = $user_name;
		$_COOKIE['user_name'] = $user_name;
		setcookie('user_name', $user_name);

		header('location: ../../index.php');
	}
?>
