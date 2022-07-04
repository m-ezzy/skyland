<?php
	require '../server.php';

	$gn = $_REQUEST['q'];
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

	$query = "INSERT INTO groups (names, created_by) VALUES('" . $gn . "','" . $u . "')";
	$conn->query($query);

	$query = "CREATE TABLE group_members_$gn (members VARCHAR(20) DEFAULT NULL,joined_on DATETIME(2) DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(members))";
	$conn->query($query);

	$query = "INSERT INTO group_members_$gn (members) VALUES('" . $u . "')";
	$conn->query($query);

	$query = "INSERT INTO groups_$u (names) VALUES('" . $gn . "')";
	$conn->query($query);

	$query = "CREATE TABLE group_messages_$gn (ROWNUM int(20),sent_by varchar(20),messages varchar(500),images varchar(10),videos varchar(10),audios varchar(10),document varchar(10),location varchar(10),sent_time DATETIME(2) DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(ROWNUM))";
	$conn->query($query);

	$groups = array();
	$groups = $_SESSION['groups'];
	$groups[] = $gn;
	$_SESSION['groups'] = $groups;

	echo "<div onclick='show_messages_groups(this, " . $gn . ")'>";
	echo "<img src='../media/images/place_holder3.png'>";
	echo $gn;
	echo "</div>";
?>
