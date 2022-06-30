<?php
	require 'server.php';

	$u = $_SESSION['user_name'];
	$_SESSION['groups'] = array();

	//$query = "SELECT names FROM groups_$u";
	$query = "SELECT groups_$u.names,groups.extension FROM groups INNER JOIN groups_$u ON groups.name=groups_$u.names";

	$result = $conn->query($query);

	$rows = array();
	$groups = array();

	while($row = $result->fetch_object()) {
		$rows[] = $row;
		$groups[] = $row->names;
	}
	$_SESSION['groups'] = $groups;
	
	$json = json_encode($rows);
	echo $json;
?>
