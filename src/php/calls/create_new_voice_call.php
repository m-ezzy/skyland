<?php
	require '../server.php';

	$u2 = $_POST['user_name'];
	$u = $_SESSION['user_name'];

	$i = array_search($u2, $_SESSION['chats']['user_name']);
	$_SESSION['chats']['row_down'][$i] += 1;
	$rn = $_SESSION['chats']['row_down'][$i];

	$first = $u;
	$second = $u2;

	if($u > $u2) {
		$first = $u2;
		$second = $u;
	}

	$query = "INSERT INTO chat_between_$first" . "_$second(ROWNUM,sent_by,audios) VALUES($rn,'$u','1')";
	$conn->query($query);

	$query = "SELECT peer_id FROM peer_ids WHERE user_name=$u2";
	$result = $conn->query($query);
	$r = $result->fetch_object();

	echo $r->peer_id;
?>
