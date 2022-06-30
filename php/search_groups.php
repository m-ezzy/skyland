<?php
	require 'server.php';

	$s = $_REQUEST['q'];
	$u = $_SESSION['user_name'];

	$i = 0;
	$NewChat = array();

	// lookup all hints from array if $q is different from ""
    $s = strtolower($s);

	$query = "SELECT user_name FROM accounts WHERE user_name LIKE '" . $s . "%'";
	$result = mysqli_query($conn, $query);

	if($result->num_rows == 0) {
		echo "<div class='chat'>";
		echo "No Such user name Found.";
		echo "</div>";
	} else {
		//add banner showing already created chats
		echo "<div class='chat'>";
		echo "Previous Chats";
		echo "</div>";

		while($row = $result->fetch_object()) {
			$i = 0;
			//while($Chat = $_SESSION['Chats'][$i]) {
			$i = array_search($row->user_name,$_SESSION['chats']);

			if($i OR $i === 0) {
				echo "<div class='chat' onclick='take_to_that_chat(" . $row->user_name . ")'>";
				echo $row->user_name;
				echo "</div>";
			} else {
				$NewChat[] = $row->user_name;
			}
			//$i++;
			//}
		}

		//add banner showing chats with whom no previous communication
		echo "<div class='chat'>";
		echo "Start a New Chat";
		echo "</div>";

		foreach($NewChat as $NC) {
			echo "<div class='chat' onclick='create_new_chat(" . $NC . ")'>";
			//echo "<div class='Chat' onclick='CreateNewChat(";
			//echo "'$NC'";
			//echo ")'>";
			echo $NC;
			echo "</div>";
		}
	}
?>
