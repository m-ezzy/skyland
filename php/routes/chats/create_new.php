<?php
	require '../server.php';

	//$u2 = $_REQUEST['q'];
	$u2 = $_POST['user_id'];
	$u = $_SESSION['user_id'];

	/*
	//check if chat already exists, by extension chat table between them
	$query = "SELECT user_name FROM chats_$u";
	$result = $conn->query($query);

	$exists = 0;
	while($row = $result->fetch_object()) {
		if($row->user_name == $u2) {
			$exists = 1;
			exit;
		}
	}*/

	$query = "INSERT INTO chats(user_id1,user_id2) VALUES('$u','$u2')";
	$conn->query($query);

	$chat_id = $conn->insert_id;
	$_SESSION['chats']['chat_id'][] = $chat_id;

	mkdir("../../../data/chats/chat_id_$chat_id");

	$query = "SELECT COUNT(*) FROM chats WHERE chat_id=$chat_id";
	$result = $conn->query($query);
	$r = $result->fetch_all();

	$_SESSION['chats']['row_up'][] = $r[0][0];
	$_SESSION['chats']['row_down'][] = $r[0][0];
	$_SESSION['chats']['user_id'][] = $u2;
?>
