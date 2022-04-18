<?php
	require 'server.php';
	//session_start();

	$u = $_SESSION['user_name'];
	//$u = '1';

	$imageURL = "data/ProfilePictures/" . $u . ".jpg";

	$query = "SELECT user_name,first_name,last_name FROM user_info WHERE user_name=" . $u;
	$result = mysqli_query($conn, $query);
	$row = $result->fetch_object();

	$json = json_encode($row);

	echo $json;

	/*
	echo "<div id='profile_picture'>";
		echo "<img src=$imageURL alt='' width=200 height=200 />";
	echo "</div>";
	*/
	//echo $u;
?>
