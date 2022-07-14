<?php
	require '../server.php';

	$u = $_SESSION['user_name'];
	$u2 = $_SESSION['current']['chat'];

    $c = array();
    $c = $_SESSION['chats'];
	$row_number = $c->length();

	$first = $u < $u2 ? $u : $u2;
	$second = $u < $u2 ? $u2 : $u;

	$query = "SELECT * FROM chats_$u WHERE ROWNUM>" . $row_number;
	$result = $conn->query($query);

	if($result->num_rows > $row_number) {
		$rows = array();
	
		while($row = $result->fetch_object()) {
			$rows[] = $row;
			$row_number++;
		}
		$_SESSION['row_number'] = $row_number;

		echo json_encode($rows);
	}
?>
