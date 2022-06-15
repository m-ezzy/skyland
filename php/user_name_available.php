<?php
	require 'server.php';

	$s = $_REQUEST['s'];

	$query = "SELECT user_name FROM accounts WHERE user_name=$s";
	$result = $conn->query($query);

	if ($result->num_rows) {
		echo 0;
		//print_r($o->user_name);
	} else {
		echo 1;
	}
?>
