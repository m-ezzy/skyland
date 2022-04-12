<?php
	require 'server.php';

	$u2 = $_REQUEST['q'];
	$u = $_SESSION['username'];

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
		$query = "INSERT INTO chats_$u(user) VALUES('" . $u2 . "')";
		$conn->query($query);

		if($u < $u2){
			$query = "CREATE TABLE chat_between_$u" . "_$u2 (ROWNUM int(20),sent_by varchar(20),message varchar(500),time DATETIME(2) DEFAULT CURRENT_TIMESTAMP)";
		} else {
			$query = "CREATE TABLE chat_between_$u2" . "_$u (ROWNUM int(20),sent_by varchar(20),message varchar(500),time DATETIME(2) DEFAULT CURRENT_TIMESTAMP)";
		}
		$conn->query($query);

		echo "<div class='Chat' onclick='ShowMessages(" . $u2 . ")'>";
		echo $u2;
		echo "</div>";
	//}
?>
