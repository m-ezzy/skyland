<?php
	require '../server.php';

	$u = $_SESSION['user_name'];

	$json = array();

	for($i = 0 ; $i < count($_SESSION['chats']['user_name']) ; $i++) {
		$u2 = $_SESSION['chats']['user_name'][$i];
		$row_down = $_SESSION['chats']['row_down'][$i];

		$first = $u < $u2 ? $u : $u2;
		$second = $u < $u2 ? $u2 : $u;

		$query = "SELECT * FROM chat_between_$first" . "_$second WHERE ROWNUM>" . $row_down;
		$result = $conn->query($query);

		//$json[$u2] = array();

		if($result->num_rows > 0) {	
			while($row = $result->fetch_object()) {
				if($row->sent_by == $u2) { //just a precaution step, not necessary
					$json[$u2][] = $row;
					$_SESSION['chats']['row_down'][$i]++;
				}
			}
		} else {
			$json[$u2][] = 0;
		}
	}

	echo json_encode($json);
?>
