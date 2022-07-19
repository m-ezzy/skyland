<?php
	require '../server.php';

	$u = $_SESSION['user_name'];

	$_SESSION['chats'] = array();
	$_SESSION['chats']['user_name'] = array();
	$_SESSION['chats']['row_up'] = array();
	$_SESSION['chats']['row_down'] = array();

	//$query = "SELECT user FROM chats_$u";
	//user_info needs to be written first then chats_u table if we want user chat first
	$query = "SELECT chats_$u.user_name,user_info.first_name,user_info.last_name,user_info.extension FROM user_info INNER JOIN chats_$u ON user_info.user_name=chats_$u.user_name";
	$result = $conn->query($query);

	$rows = array();
	while($row = $result->fetch_object()) {
		//$_SESSION['chats'][] = array($row->user_name => ['row_up' => 0]);
		$_SESSION['chats']['user_name'][] = $row->user_name;
		//$_SESSION['chats'][$row->user_name] = array();
		$rows[] = $row;
	}

	$i = 0;
	while($i < count($_SESSION['chats']['user_name'])) {
	//foreach($_SESSION['chats'] as $key => $value) {
		$u2 = $_SESSION['chats']['user_name'][$i];
		//$u2 = $key;

		$first = $u < $u2 ? $u : $u2;
		$second = $u < $u2 ? $u2 : $u;

		$query = "SELECT COUNT(*) FROM chat_between_$first" . "_" . $second;
		$result = $conn->query($query);
		$r = $result->fetch_all();
		//print_r($r);

		$_SESSION['chats']['row_up'][] = $r[0][0];
		$_SESSION['chats']['row_down'][] = $r[0][0];

		$i++;
	}
	
	$json = json_encode($rows);
	echo $json;
?>
