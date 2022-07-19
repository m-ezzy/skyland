<?php
	require '../server.php';

	$u = $_SESSION['user_name'];
	$json = array();

	for($i = 0 ; $i < count($_SESSION['chats']) ; $i++) {
		$u = $_SESSION['user_name'];
		$u2 = $_SESSION['chats'][$i]['user_name'];
		$num_rows = $_SESSION['chats'][$i]['num_rows'] + 1;

		$first = $u < $u2 ? $u : $u2;
		$second = $u < $u2 ? $u2 : $u;

		$query = "SELECT * FROM chat_between_$first" . "_$second WHERE ROWNUM>" . $num_rows;
		$result = $conn->query($query);

		$json[$u2] = array();

		if($result->num_rows > 0) {	
			while($row = $result->fetch_object()) {
				if($row->sent_by == $u2) { //just a precaution step, not necessary
					$json[$u2][] = $row;
					$_SESSION['chats'][$i]['num_rows']++;
				}
			}
		} else {
			$json[$u2] = '0';
		}
	}

	echo json_encode($json);
?>
