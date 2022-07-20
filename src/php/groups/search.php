<?php
	require '../server.php';

	$s = $_REQUEST['q'];

	$u = $_SESSION['user_name'];
	$groups = $_SESSION['groups']['group_name'];

	$your_groups = array();
	$join_groups = array();

	// lookup all hints from array if $q is different from ""
	$s = strtolower($s);

	$query = "SELECT group_name,display_name,extension FROM groups WHERE group_name LIKE '" . $s . "%'";
	$result = $conn->query($query);

	if($result->num_rows) {
		while($row = $result->fetch_object()) {
			$match = 0;
			$match = array_search($row->group_name, $groups);

			if($match OR $match === 0) {
				$your_groups[] = $row;
			} else {
				$join_groups[] = $row;
			}
		}
		
		$yg = count($your_groups);
		$jg = count($your_groups);
		$groups = array_merge($your_groups, $join_groups);

		if($your_groups) {
			//add banner showing already created chats
			echo "<div> your groups </div>";

			$i = 0;
			while($row = $your_groups[$i]) {
				echo "<div onclick='groups.take_to_that_group(this," . $row->group_name . ")'>";
				echo "<img src='data/groups/icons/'" . $row->group_name . "." . $row->extension . "'>";
				echo $row->group_name . " " . $row->display_name;
				echo "</div>";
				$i++;
			}
		}
		if($join_groups) {
			echo "<div> send request to join this group </div>";

			$i = 0;
			while($row = $join_groups[$i]) {
				echo "<div onclick='groups.send_request_to_join(" . $row->group_name . ")'>";
				echo "<img src='data/groups/icons/'" . $row->group_name . "." . $row->extension . "'>";
				echo $row->group_name . " " . $row->display_name;
				echo "</div>";
				$i++;
			}
		}
	} else {
		echo "<div onclick='groups.create_new()'> create new group </div>";
	}
?>
