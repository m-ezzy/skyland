<?php
	require 'server.php';
	session_start();

	$u = $_SESSION['user_name'];
	//$u = '1';

	$image_URL = "data/profile_pictures/" . $u . ".jpg";

	echo "<div id='profile_picture'>";
		echo "<img src=$image_URL alt='' width='100' height='100'/>";
	echo "</div>";
?>
