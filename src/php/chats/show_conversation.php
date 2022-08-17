<?php
	require '../server.php';

	$chat_id = $_REQUEST['id'];
	$row_up = $_REQUEST['row_up'];
	$u = $_SESSION['user_id'];

	$i = array_search($chat_id, $_SESSION['chats']['chat_id']);
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

	$query = "SELECT * FROM chat_media WHERE chat_id=$chat_id AND chat_media_id>$row_up LIMIT $l";
	$result = $conn->query($query);
	//$result = mysqli_query($conn, $query);

	$rows = array();
	$rows = $result->fetch_all(MYSQLI_ASSOC);

	$_SESSION['chats']['row_up'][$i] -= count($rows);

	$json = json_encode($rows);
	echo $json;
?>
