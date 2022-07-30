<?php
	require '../server.php';

	$u2 = $_REQUEST['q'];
	$u = $_SESSION['user_name'];

	$i = array_search($u2, $_SESSION['chats']['user_name']);
	$row_up = $_SESSION['chats']['row_up'][$i];

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

	$first = $u;
	$second = $u2;

	if($u > $u2) {
		$first = $u2;
		$second = $u;
	}

	$query = "SELECT * FROM chat_between_$first" . "_$second WHERE ROWNUM>$row_up LIMIT $l";
	$result = $conn->query($query);
	//$result = mysqli_query($conn, $query);

	$rows = array();
	$rows = $result->fetch_all(MYSQLI_ASSOC);

	$_SESSION['chats']['row_up'][$i] -= count($rows);

	$json = json_encode($rows);
	echo $json;
?>
