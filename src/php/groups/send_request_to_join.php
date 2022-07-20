<?php
	require '../server.php';

	$gn = $_REQUEST['q'];

	$u = $_SESSION['user_name'];

	$query = "INSERT INTO group_members_$gn (members,requested) VALUES('" . $u . "',1)";
	$conn->query($query);

    $query = "INSERT INTO groups_$u (group_name,requested) VALUES('" . $gn . "',1)";
	$conn->query($query);
?>
