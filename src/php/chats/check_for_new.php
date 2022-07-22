<?php
	require '../server.php';

	$u = $_SESSION['user_name'];
    $row_number = $_SESSION['chats']['user_name']->length();

	$query = "SELECT * FROM chats_$u WHERE ROWNUM>" . $row_number;
	$result = $conn->query($query);

	if($result->num_rows > 0) {
		$rows = array();

		while($row = $result->fetch_object()) {
			$rows[] = $row;
		}
		echo json_encode($rows);
	} else {
		echo json_encode('0');
	}
?>
