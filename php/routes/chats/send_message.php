<?php
	require '../server.php';

	$u = $_COOKIE['user_id'];
	$chat_id = $_REQUEST['id'];
	$m = $_REQUEST['m'];

	$u = $_SESSION['user_id'];

	$i = array_search($chat_id, $_SESSION['chats']['chat_id']);
	$_SESSION['chats']['row_down'][$i] += 1;
	$rn = $_SESSION['chats']['row_down'][$i];

	$query = "INSERT INTO chat_media(chat_id,sender_id,media_type,text) VALUES ($chat_id,$u,0,'$m')";
	$result = $conn->query($query);

	echo "1 success";
?>
