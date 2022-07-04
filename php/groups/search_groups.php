<?php
	require '../server.php';

	$s = $_REQUEST['q'];
	$u = $_SESSION['user_name'];
	$groups = $_SESSION['groups'];

	$i = 0;
	//$join_group = array();

	$t = "";

	// lookup all hints from array if $q is different from ""
	$s = strtolower($s);

	$query = "SELECT names,extension FROM groups WHERE names LIKE '" . $s . "%'";
	$result = $conn->query($query);

	if($result->num_rows) {
		//add banner showing already created chats
		echo "<div>";
		echo "your groups";
		echo "</div>";

		while($row = $result->fetch_object()) {
			$match = 0;
			//while($Chat = $_SESSION['Chats'][$i]) {
			$match = array_search($row->names,$groups);

			if($match OR $match === 0) {
				echo "<div onclick='take_to_that_group(";
				echo $row->names;
				echo ")'>";
				echo "<img src='../data/groups/icons/'";
				echo $row->names;
				echo ".";
				echo $row->extension;
				echo "'>";
				echo $row->names;
				echo "</div>";
			} else {
				//$join_group[] = $row;

				$t .= "<div onclick='send_request_to_join_group(" . $row->names . ")'>";
				$t .= "<img src='../data/groups/icons/'";
				$t .= $row->names . "." . $row->extension . "'>";
				$t .= $row->names;
				$t .= "</div>";
			}
			//$i++;
			//}
		}

		if($t != "") {
			//add banner showing chats with whom no previous communication
			echo "<div>";
			echo "send request to join this group";
			echo "</div>";

			/*
			foreach($join_group as $jg) {
				echo "<div onclick='send_request_to_join_group(" . $jg->names . ")'>";
				echo "<img src='../data/groups/icons/'" . $jg->names . "." . $jg->extension . "'>";
				echo $jg->names;
				echo "</div>";
			}
			*/

			echo $t;
		}
	} else {
		echo "<div onclick='create_new_group()'>";
		echo "create new group";
		echo "</div>";
	}
?>
