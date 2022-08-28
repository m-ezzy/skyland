<?php
	require '../server.php';
	//session_start();

	$u = (int)$_SESSION['user_id'];

	$query = "SELECT user_id,user_name,first_name,last_name,extension FROM accounts WHERE user_id=$u";
	$result = $conn->query($query);

	//$row = array();
	$row = $result->fetch_assoc();

	$json = json_encode($row);
	echo $json;
?>
