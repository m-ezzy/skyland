<?php
	require '../server.php';

	$u = $_SESSION['user_id'];
	$u2 = $_POST['user_id'];
	$ci = $_POST['chat_id'];
	$t = $_POST['type'];

	$query = "INSERT INTO calls_chats(chat_id,called_by,type) VALUES('$ci',$u,$t)";
	$conn->query($query);

	$query = "SELECT peer_id FROM peer_id WHERE user_id=$u2";
	$result = $conn->query($query);

	$r = $result->fetch_object();

	echo $r->peer_id;
?>
