<?php
	require 'server.php';

	$m = $_REQUEST['q'];

	$u = $_SESSION['user_name'];
	$gn = $_SESSION['current']['group'];

	$row_number = $_SESSION['groups'][$gn]['row_number'];
	$row_number += 1;
	$_SESSION['groups'][$gn]['row_number'] = $row_number;

	$query = "INSERT INTO group_messages_$gn (ROWNUM,sent_by,messages) VALUES(" . $row_number . ",'" . $u . "','" . $m . "')";
	$conn->query($query);

	/*
	if ($conn->query($query)) {
		echo "success";
	}*/
?>
