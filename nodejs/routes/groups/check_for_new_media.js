<?php
	require '../server.php';

	$u = $_SESSION['user_name'];

	$json = array();

	for($i = 0 ; $i < count($_SESSION['groups']['group_name']) ; $i++) {
		$gn = $_SESSION['groups']['group_name'][$i];
		$row_down = $_SESSION['groups']['row_down'][$i];

		$query = "SELECT * FROM group_messages_$gn WHERE ROWNUM>" . $row_down;
		$result = $conn->query($query);

		//$json[$u2] = array();

		if($result->num_rows > 0) {	
			while($row = $result->fetch_object()) {
				if($row->sent_by != $u) { //just a precaution step, not necessary
					$json[$gn][] = $row;
					$_SESSION['groups']['row_down'][$i]++;
				}
			}
		} else {
			$json[$gn][] = 0;
		}
	}

	echo json_encode($json);
?>
