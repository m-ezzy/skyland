<?php
	require '../server.php';

	$gn = $_REQUEST['gn'];

	$query = "SELECT members FROM group_members_$gn";
	$result = $conn->query($query);

	$rows = array();
	while($r = $result->fetch_object()) {
		$rows[] = $r;
	}
	
	$json = json_encode($rows);
	echo $json;
?>
