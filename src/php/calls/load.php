<?php
	require '../server.php';

	$u = $_SESSION['user_id'];

    $query = "SELECT * FROM calls_chats WHERE chat_id in (SELECT chat_id FROM chats WHERE user_id1=$u OR user_id2=$u)";
	$rows = $conn->query($query);

	echo json_encode($rows->fetch_all(MYSQLI_ASSOC));
?>
