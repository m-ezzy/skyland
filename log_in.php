<?php
	require 'server.php';
	session_start();

	$user_name = '';
	$pass_word = '';

	$user_name = &$_POST['u'];
	$pass_word = &$_POST['p'];

	$query = "SELECT * FROM accounts WHERE user_name='$user_name' AND pass_word='$pass_word'";
	$result = mysqli_query($conn, $query);

	if(mysqli_num_rows($result) == 0) {
		$query = "SELECT * FROM accounts WHERE user_name='$user_name'";
		$result = mysqli_query($conn, $query);

		if(mysqli_num_rows($result) == 0) {
			echo "0";
			echo "user name is incorrect !";
			echo $user_name;
			echo $pass_word;
		} else {
			echo "1";
			echo "pass word is incorrect !";
		}
	} else {
		echo "2";
		//session_start();
		$_SESSION['user_name'] = $user_name;
		//header('location: index.php');
	}
?>
