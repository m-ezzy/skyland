<?php
	require '../server.php';

	$s = $_REQUEST['q'];
	$u = $_SESSION['user_name'];

	$pre = 0;
	$new = 0;

	$new_chats = array();
	$rows = array();

	// lookup all hints from array if $q is different from ""
    $s = strtolower($s);

	//$query = "SELECT user_name FROM accounts WHERE user_name LIKE '" . $s . "%'";
	//$query = "SELECT user_name,first_name,last_name,extension FROM user_info WHERE user_name LIKE '" . $s . "%'";

	//$query = "SELECT * FROM user_info LEFT JOIN chats_$u ON user_info.user_name=chats_$u.user_name WHERE chats_$u.user_name IS NULL";
	$query = "SELECT * FROM user_info WHERE user_name LIKE '" . $s . "%'" . " AND user_name NOT IN (SELECT user_name FROM chats_$u)";
	//$query = "SELECT * FROM user_info WHERE NOT EXISTS (SELECT * FROM chats_$u WHERE chats_$u.user_name=user_info.username)";

	$result = mysqli_query($conn, $query);

	while ($row = $result->fetch_object()) {
		$rows[] = $row;
	}

	/*
	$rows[0]->match_found = "0";
	$rows[0]->previous = 0;
	$rows[0]->new_chat = 0;
	*/

	//array_push($rows, ["match_found" => 0, "previous" => 0, "new_chat" => 0]);

	/*
	if ($result->num_rows == 0) {
		//$rows[0]->match_found = 0;
		return;
	}

	while ($row = $result->fetch_object()) {
		$match = in_array($row->user_name, $_SESSION['chats']);

		if ($match) {
			$rows[] = $row;
			//$rows[0]->previous++;
		} else {
			$new_chats[] = $row;
			//$rows[0]->new_chat++;
		}
	}
	//array_merge($rows, $new_chats);
	
	foreach($new_chats as $nc) {
		$rows[] = $nc;
	}
	*/

	$json = json_encode($rows);
	echo $json;
?>
