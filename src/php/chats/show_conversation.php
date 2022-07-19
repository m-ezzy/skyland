<?php
	require '../server.php';

	$u2 = $_REQUEST['q'];
	$u = $_SESSION['user_name'];

	/*$users = array();
	$users = $_SESSION['chats']['user_name'];*/
	$i = array_search($u2, $_SESSION['chats']['user_name']);

	//$num = 10;
	//$row_up = $_SESSION['chats']['row_up'][$i];
	//$row_up = $row_up - $num;
	$_SESSION['chats']['row_up'][$i] -= $limit;
	$row_up = $_SESSION['chats']['row_up'][$i];

	/*$upper = $_SESSION['chats'][$u2]['row_up'];
	$upper = $upper - 10;
	$_SESSION['chats'][$u2]['row_up'] = $upper;*/

	$first = $u;
	$second = $u2;

	if($u > $u2) {
		$first = $u2;
		$second = $u;
	}

	$query = "SELECT * FROM chat_between_$first" . "_$second WHERE ROWNUM>$row_up LIMIT $limit";
	$result = $conn->query($query);
	//$result = mysqli_query($conn, $query);

	$rows = array();
	$rows = $result->fetch_all(MYSQLI_ASSOC);

	$json = json_encode($rows);
	echo $json;
?>
