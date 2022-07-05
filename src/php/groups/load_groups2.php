<?php
	require '../server.php';

	$u = $_SESSION['user_name'];
	$_SESSION['groups'] = array();

	$query = "SELECT names FROM groups_$u";
	//$query = "SELECT groups_$u.names,groups.extension FROM groups INNER JOIN groups_$u ON groups.names=groups_$u.names";
	$result = $conn->query($query);

	$groups = array();

	while($row = $result->fetch_object()) {
		echo "<div onclick='show_messages_groups(this," . $row->names . ")'>";
		echo "<img src='../../media/images/place_holder3.png'>";
		echo $row->names;
		echo "</div>";

		$groups[] = $row->names;
	}
	$_SESSION['groups'] = $groups;
?>
