<?php
	require 'server.php';

	$user_to_add = $_REQUEST['q'];

	$u = $_SESSION['user_name'];
	$gn = $_SESSION['current']['group'];

    $query = "INSERT INTO group_members_$name (members) VALUES('" . $user_to_add . "')";
	$conn->query($query);

    $query = "INSERT INTO groups_$user_to_add (names) VALUES('" . $gn . "')";
	$conn->query($query);

	echo "1";
?>
