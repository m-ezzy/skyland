<?php
	require '../server.php';

	$u = $_SESSION['user_id'];

	$_SESSION['chats'] = array();
	$_SESSION['chats']['chat_id'] = array();
	$_SESSION['chats']['user_id'] = array();

	$_SESSION['chats']['user_name'] = array();
	$_SESSION['chats']['first_name'] = array();
	$_SESSION['chats']['last_name'] = array();
	$_SESSION['chats']['extension'] = array();

	$_SESSION['chats']['row_up'] = array();
	$_SESSION['chats']['row_down'] = array();

	//user_info needs to be written first then chats_u table if we want user chat first
	//$query = "SELECT user_info.user_id,user_info.first_name,user_info.last_name,user_info.extension,chats.id FROM accounts INNER JOIN chats ON user_info.user_id=chats.user_id1 OR user_info.user_id=chats.user_id2 WHERE chats.user_id1='$u' OR chats.user_id2='$u'";
	$query = "SELECT chat_id,user_id1,user_id2 FROM chats WHERE user_id1=$u OR user_id2=$u";
	$rows = $conn->query($query);

	$a = array();

	$i = 0;
	while($row = $rows->fetch_object()) {
		$a[]['chat_id'] = $row->chat_id;
		$_SESSION['chats']['chat_id'][] = $row->chat_id;

		if ($row->user_id1 == $u) {
			$a[$i]['user_id'] = $row->user_id2;
			$_SESSION['chats']['user_id'][] = $row->user_id2;
		} else {
			$a[$i]['user_id'] = $row->user_id1;
			$_SESSION['chats']['user_id'][] = $row->user_id1;
		}

		$query2 = "SELECT user_name,first_name,last_name,extension FROM accounts WHERE user_id=" . $a[$i]['user_id'];
		$rows2 = $conn->query($query2);
		$row2 = $rows2->fetch_object();

		$a[$i]['user_name'] = $row2->user_name;
		$a[$i]['first_name'] = $row2->first_name;
		$a[$i]['last_name'] = $row2->last_name;
		$a[$i]['extension'] = $row2->extension;

		$_SESSION['chats']['user_name'][] = $row2->user_name;
		$_SESSION['chats']['first_name'][] = $row2->first_name;
		$_SESSION['chats']['last_name'][] = $row2->last_name;
		$_SESSION['chats']['extension'][] = $row2->extension;

		$i++;
	}

	$i = 0;
	foreach($_SESSION['chats']['chat_id'] as $key => $value) {
		$query = "SELECT COUNT(*) FROM chat_media";
		$result = $conn->query($query);
		$r = $result->fetch_all();

		$a[$i]['row_up'] = $r[0][0];
		$a[$i]['row_down'] = $r[0][0];

		$_SESSION['chats']['row_up'][] = $r[0][0];
		$_SESSION['chats']['row_down'][] = $r[0][0];

		$i++;
	}
	
	$json = json_encode($a);
	echo $json;
?>
