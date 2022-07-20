<?php
	require '../server.php';

	$u = $_SESSION['user_name'];
	$gn = $_REQUEST['q'];

	$i = array_search($gn, $_SESSION['groups']['group_name']);

	$_SESSION['groups']['row_up'][$i] -= $limit;
	$row_up = $_SESSION['groups']['row_up'][$i];

	$query = "SELECT * FROM group_messages_$gn WHERE ROWNUM>$row_up LIMIT $limit";
	$result = $conn->query($query);

	$rows = array();
	$rows = $result->fetch_all(MYSQLI_ASSOC);

	$json = json_encode($rows);
	echo $json;
?>
