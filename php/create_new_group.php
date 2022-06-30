<?php
	require 'server.php';

	$name = $_REQUEST['q'];
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

	$query = "CREATE TABLE groups_members_$name (members VARCHAR(20) DEFAULT NULL,joined_on DATETIME(2) DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(members))";
	$conn->query($query);

	$query = "INSERT INTO groups_members_$name (members) VALUES('" . $u . "')";
	$conn->query($query);

	$query = "INSERT INTO groups_$u (names) VALUES('" . $name . "')";
	$conn->query($query);

	$query = "CREATE TABLE group_messages_$name (ROWNUM int(20),sent_by varchar(20),message varchar(500),time DATETIME(2) DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(ROWNUM))";
	$conn->query($query);

	$first = $u;
	$second = $u2;

	if($u > $u2) {
		$first = $u2;
		$second = $u;
	}
	$query = "CREATE TABLE chat_between_$first" . "_$second (ROWNUM int(20),sent_by varchar(20),message varchar(500),time DATETIME(2) DEFAULT CURRENT_TIMESTAMP)";
	$conn->query($query);

	$groups = array();
	$groups = $_SESSION['groups'];
	$groups[] = $name;
	$_SESSION['groups'] = $groups;

	echo "<div onclick='show_messages_groups(this, " . $name . ")'>";
	echo $name;
	echo "</div>";
?>
