<?php
	require 'server.php';

	$name = $_REQUEST['name'];
	$u = $_SESSION['user_name'];

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

    $query = "INSERT INTO groups(name, created_by) VALUES('" . $name . "','" . $u . "')";
	$conn->query($query);

	$query = "CREATE TABLE groups_$name (members) VALUES('" . $name . "','" . $u . "')";
	$conn->query($query);

	$first = $u;
	$second = $u2;

	if($u > $u2) {
		$first = $u2;
		$second = $u;
	}
	$query = "CREATE TABLE chat_between_$first" . "_$second (ROWNUM int(20),sent_by varchar(20),message varchar(500),time DATETIME(2) DEFAULT CURRENT_TIMESTAMP)";
	$conn->query($query);

	$chats = array();
	$chats = $_SESSION['chats'];
	$chats[] = $u2;
	$_SESSION['chats'] = $chats;

	echo "<div class='chat' onclick='show_messages(this, " . $u2 . ")'>";
	echo $u2;
	echo "</div>";
?>
