<?php
	require '../server.php';

	$s = $_REQUEST['q'];
	$u = $_SESSION['user_id'];

	$rows = array();

	// lookup all hints from array if $q is different from ""
    $s = strtolower($s);

	$query = "SELECT * FROM accounts WHERE user_name LIKE '$s%' OR first_name LIKE '$s%' OR last_name LIKE '$s%'";
	$result = mysqli_query($conn, $query);

	while ($row = $result->fetch_object()) {
		$match = array_search($row->user_id, $_SESSION['chats']['user_id']);
		if ($match == false) {
			$rows[] = $row;
		}
	}

	$json = json_encode($rows);
	echo $json;
?>
