<?php
	require '../server.php';

	$gn = $_POST['group_name'];
	$u = $_SESSION['user_name'];

	$query = "INSERT INTO groups (group_name, created_by) VALUES('" . $gn . "','" . $u . "')";
	$conn->query($query);

	$query = "CREATE TABLE group_members_$gn (members VARCHAR(20) DEFAULT NULL,requested int(2) DEFAULT 0,joined_on DATETIME(2) DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(members))";
	$conn->query($query);

	$query = "INSERT INTO group_members_$gn (members) VALUES('" . $u . "')";
	$conn->query($query);

	$query = "INSERT INTO groups_$u (group_name) VALUES('" . $gn . "')";
	$conn->query($query);

	$query = "CREATE TABLE group_messages_$gn (ROWNUM int(20),sent_by varchar(20),messages varchar(500),images varchar(10),videos varchar(10),audios varchar(10),document varchar(10),location varchar(10),time_sent DATETIME(2) DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(ROWNUM))";
	$conn->query($query);

	$_SESSION['groups']['group_name'][] = $gn;

	echo "<div onclick='groups.show_conversation(this, " . $gn . ")'>";
	echo "<img src='media/images/place_holder_groups.png'>";
	echo $gn;
	echo "</div>";
?>
