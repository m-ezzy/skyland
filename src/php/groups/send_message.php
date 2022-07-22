<?php
	require '../server.php';

	$gn = $_REQUEST['n'];
	$m = $_REQUEST['m'];

	$u = $_SESSION['user_name'];

	$i = array_search($gn, $_SESSION['groups']['group_name']);
	$_SESSION['groups']['row_down'][$i] += 1;
	$rn = $_SESSION['groups']['row_down'][$i];

	/*
	$rn = $_SESSION['groups']['group_name']['row_down'];
	$rn += 1;
	$_SESSION['groups']['group_name']['row_down'] = $rn;*/

	$query = "INSERT INTO group_messages_$gn (ROWNUM,sent_by,messages) VALUES(" . $rn . ",'" . $u . "','" . $m . "')";
	$conn->query($query);
?>
