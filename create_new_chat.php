<?php
	require 'server.php';

	$u2 = $_REQUEST['q'];
	$u = $_SESSION['user_name'];

	/*
	//check if chat already exists, by extension chat table between them
	$query = "SELECT user FROM chats$u";
	$result = $conn->query($query);

	while($row = $result->fetch_object()) {
		if($u2 == $row->user) {
			$u2 = -1;
			exit;
		}
	}
	*/

	//if($u2 != -1) {
	$query = "INSERT INTO chats_$u(user_name) VALUES('" . $u2 . "')";
	$conn->query($query);

	$first = $u;
	$second = $u2;

	if($u > $u2) {
		$first = $u2;
		$second = $u;
	}
	$query = "CREATE TABLE chat_between_$first" . "_$second (ROWNUM int(20),sent_by varchar(20),message varchar(500),time DATETIME(2) DEFAULT CURRENT_TIMESTAMP)";

	if ($conn->query($query)) {

		$chats = array();
		$chats = $_SESSION['chats'];
		$chats[] = $u2;
		$_SESSION['chats'] = $chats;

		echo "<div class='chat' onclick='show_messages(" . $u2 . ")'>";
		echo $u2;
		echo "</div>";
	}
?>
