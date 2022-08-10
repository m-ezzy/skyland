<?php
	require '../server.php';
	//session_start();

	$u = $_SESSION['user_name'];

	$query = "SELECT user_name,first_name,last_name,extension FROM user_info WHERE user_name=" . $u;
	$result = $conn->query($query);
	
	$row = $result->fetch_object();

	$json = json_encode($row);
	echo $json;
?>
