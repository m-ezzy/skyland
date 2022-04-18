<?php
	include 'server.php';
	//require 'server.php';
	//session_start();

	//$UserName = '';
	//$pass_word = '';

	$UserName = $_POST['user_name'];
	$pass_word = $_POST['pass_word'];

	/*
	$UserName = &$_POST['u'];
	$pass_word = &$_POST['p'];
	*/

	$query = "SELECT * FROM accounts WHERE UserName='$UserName' AND pass_word='$pass_word'";
	$result = mysqli_query($conn, $query);

	if(mysqli_num_rows($result) == 0) {
		$query = "SELECT * FROM accounts WHERE UserName='$UserName'";
		$result = mysqli_query($conn, $query);

		if(mysqli_num_rows($result) == 0) {
			echo "0";
			echo "user name is incorrect !";
			echo $UserName;
			echo $pass_word;
		} else {
			echo "1";
			echo "pass word is incorrect !";
		}
	} else {
		//echo "2";
		//session_start();
		//$_SESSION['UserName'] = $UserName;
		$_SESSION['user_name'] = $UserName;
		
		printf($UserName);
		print($UserName);
		print_r($_SESSION);
		
		header('location: index.php');
	}
?>
