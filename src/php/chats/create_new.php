<?php
	require '../server.php';

	//$u2 = $_REQUEST['q'];
	$u2 = $_POST['user_name'];
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

	$query = "INSERT INTO chats_$u(user_name) VALUES('" . $u2 . "')";
	$conn->query($query);

	$query = "INSERT INTO chats_$u2(user_name) VALUES('" . $u . "')";
	$conn->query($query);

	$first = $u;
	$second = $u2;

	if($u > $u2) {
		$first = $u2;
		$second = $u;
	}

	//check this ' IF NOT EXISTS ' stuff in action
	//$query = "CREATE TABLE IF NOT EXISTS chat_between_$first" . "_$second (ROWNUM int(20),sent_by varchar(20),messages varchar(200) DEFAULT NULL,images varchar(10) DEFAULT NULL,videos varchar(10) DEFAULT NULL,audios varchar(10) DEFAULT NULL,document varchar(10) DEFAULT NULL,location varchar(10) DEFAULT NULL,time_sent DATETIME(2) DEFAULT CURRENT_TIMESTAMP,time_delivered DATETIME(2),time_seen DATETIME(2))";
	$query = "CREATE TABLE IF NOT EXISTS chat_between_$first" . "_$second (ROWNUM int(20),sent_by varchar(20),messages varchar(200) DEFAULT NULL,images varchar(10) DEFAULT NULL,videos varchar(10) DEFAULT NULL,audios varchar(10) DEFAULT NULL,document varchar(10) DEFAULT NULL,location varchar(10) DEFAULT NULL,time_sent DATETIME(2) DEFAULT CURRENT_TIMESTAMP,time_delivered DATETIME(2),time_seen DATETIME(2))";
	$conn->query($query);

	mkdir("../../../data/chats/chat_between_" . $first . "_" . $second);

	$query = "SELECT COUNT(*) FROM chat_between_$first" . "_" . $second;
	$result = $conn->query($query);
	$r = $result->fetch_all();
	//print_r($r);

	$_SESSION['chats']['row_up'][] = $r[0][0];
	$_SESSION['chats']['row_down'][] = $r[0][0];
	$_SESSION['chats']['user_name'][] = $u2;
?>
