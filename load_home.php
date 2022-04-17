<?php
	require 'server.php';
	//session_start();

	$u = $_SESSION['UserName'];
	//$u = '1';

	$imageURL = "data/ProfilePictures/".$u.".jpg";

	echo "<div id='profile_picture'>";
		echo "<img src=$imageURL alt='' width=200 height=200 />";
	echo "</div>";

	echo $u;
?>
