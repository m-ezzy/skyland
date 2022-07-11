<?php
	require '../server.php';

	$u = $_SESSION['user_name'];
	$u2 = $_SESSION['current']['chat'];
	$row_number = $_SESSION['row_number'];

	$first = $u < $u2 ? $u : $u2;
	$second = $u < $u2 ? $u2 : $u;

	$query = "SELECT * FROM chat_between_$first"."_$second WHERE ROWNUM>" . $row_number;
	$result = $conn->query($query);

	if($result->num_rows > 0) {
		$rows = array();
	
		while($row = $result->fetch_object()) {
			if($row->sent_by == $u2) {
				$rows[] = $row;
				$row_number++;
			}
		}
		$_SESSION['row_number'] = $row_number;

		echo json_encode($rows);
	}
?>
