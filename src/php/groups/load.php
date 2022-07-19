<?php
	require '../server.php';

	$u = $_SESSION['user_name'];
	$_SESSION['groups'] = array();

	$query = "SELECT group_name FROM groups_$u";
	//$query = "SELECT groups_$u.names,groups.extension FROM groups INNER JOIN groups_$u ON groups.names=groups_$u.names";
	$result = $conn->query($query);

	$rows = array();
	$groups = array();

	while($row = $result->fetch_object()) {
		$rows[] = $row;
		$groups[] = $row->group_name;
	}
	$_SESSION['groups'] = $groups;

	$json = json_encode($rows);
	echo $json;

	if(count($rows)) {
		$json = json_encode($rows);
		echo $json;
	} else {
		echo "0";
	}
?>
