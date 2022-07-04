<?php
	require '../server.php';

	$s = $_REQUEST['q'];
	$u = $_SESSION['user_name'];
	$groups = $_SESSION['groups'];

	$your_groups = array();
	$join_groups = array();

	// lookup all hints from array if $q is different from ""
	$s = strtolower($s);

	$query = "SELECT names,extension FROM groups WHERE names LIKE '" . $s . "%'";
	$result = $conn->query($query);

	if($result->num_rows) {
		while($row = $result->fetch_object()) {
			$match = 0;
			$match = array_search($row->names, $groups);

			if($match OR $match === 0) {
				$your_groups[] = $row;
			} else {
				$join_groups[] = $row;
			}
		}

		if($your_groups) {
			//add banner showing already created chats
			echo "<div> your groups </div>";

			while($row = $your_groups->fetch_object()) {
				echo "<div onclick='take_to_that_group(this," . $row->names . ")'>";
				echo "<img src='../../data/groups/icons/'" . $row->names . "." . $row->extension . "'>";
				echo $row->names;
				echo "</div>";
			}
		}
		if($join_groups) {
			echo "<div> send request to join this group </div>";

			while($row = $join_groups->fetch_object()) {
				echo "<div onclick='send_request_to_join_group(" . $row->names . ")'>";
				echo "<img src='../../../data/groups/icons/'" . $row->names . "." . $row->extension . "'>";
				echo $row->names;
				echo "</div>";
			}
		}
	} else {
		echo "<div onclick='create_new_group()'> create new group </div>";
	}
?>
