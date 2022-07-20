<?php
	require '../server.php';

	$u = $_SESSION['user_name'];

	$_SESSION['groups'] = array();
	$_SESSION['groups']['group_name'] = array();
	$_SESSION['groups']['row_up'] = array();
	$_SESSION['groups']['row_down'] = array();



	$query = "SELECT * FROM groups_$u";
	//$query = "SELECT groups_$u.group_name,groups.display_name,groups.extension FROM groups INNER JOIN groups_$u ON groups.group_name=groups_$u.group_name";
	$result = $conn->query($query);

	$rows = array();
	while($row = $result->fetch_object()) {
		$_SESSION['groups']['group_name'][] = $row->group_name;
		$rows[] = $row;
	}

	if(count($rows)) {
		$json = json_encode($rows);
		echo $json;
	} else {
		echo "0";
	}

	$i = 0;
	while($i < count($_SESSION['groups']['group_name'])) {
		$gn = $_SESSION['groups']['group_name'][$i];

		$query = "SELECT COUNT(*) FROM group_messages_$gn";
		$result = $conn->query($query);

		$r = $result->fetch_all();
		//print_r($r);

		$_SESSION['groups']['row_up'][] = $r[0][0];
		$_SESSION['groups']['row_down'][] = $r[0][0];

		$i++;
	}	
?>
