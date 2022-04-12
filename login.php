<?php
	require 'server.php';

	$user_name = '';
	$pass_word = '';

	$user_name = $_POST['user_name'];
	$pass_word = $_POST['pass_word'];

	$query = "SELECT * FROM accounts WHERE user_name='$user_name' AND pass_word='$pass_word'";

	$result = mysqli_query($conn, $query);

	if(mysqli_num_rows($result) == 0) {
		"user_name or pass_word incorrect!";
		$_SESSION['user_name'] = $user_name;

		header('location: index.php');
	}
?>
