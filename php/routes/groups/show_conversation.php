<?php
	require '../server.php';

	$u = $_SESSION['user_name'];
	$gn = $_REQUEST['q'];

	$i = array_search($gn, $_SESSION['groups']['group_name']);
	$row_up = $_SESSION['groups']['row_up'][$i];

	if ($row_up <= 0) {
		$num = array();
		$num[] = 0;
		echo json_encode($num);
		return;
	}

	$row_up -= $limit;

	$l = $limit;
	if ($row_up < 0) {
		$l = $limit + $row_up;
	}

	$query = "SELECT * FROM group_messages_$gn WHERE ROWNUM>$row_up LIMIT $l";
	$result = $conn->query($query);

	$rows = array();
	$rows = $result->fetch_all(MYSQLI_ASSOC);

	$_SESSION['groups']['row_up'][$i] -= count($rows);

	$json = json_encode($rows);
	echo $json;
?>
