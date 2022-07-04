<?php
	require '../server.php';

	$s = $_REQUEST['q'];
	$u = $_SESSION['user_name'];

	$i = 0;
	$NewChat = array();

	// lookup all hints from array if $q is different from ""
    $s = strtolower($s);

	//$query = "SELECT user_name FROM accounts WHERE user_name LIKE '" . $s . "%'";

	$query = "SELECT user_name,first_name,last_name,extension FROM user_info WHERE user_name LIKE '" . $s . "%'";
	$result = mysqli_query($conn, $query);

	if($result->num_rows == 0) {
		echo "<div class='chat'>";
		echo "no such user found.";
		echo "</div>";
	} else {
		//add banner showing already created chats
		echo "<div class='chat'>";
		echo "your previous chats";
		echo "</div>";

		while($row = $result->fetch_object()) {
			$i = 0;
			//while($Chat = $_SESSION['Chats'][$i]) {
			$i = array_search($row->user_name,$_SESSION['chats']);

			if($i OR $i === 0) {
				$path = $row->extension ? "../../data/profile_pictures/" . $row->user_name . "." . $row->extension : "../../media/images/place_holder3.png";
				echo "<div class='chat' onclick='take_to_that_chat(this," . $row->user_name . ")'>";
				echo "<img src='$path'>";
				echo $row->user_name . " " . $row->first_name . " " . $row->last_name;
				echo "</div>";
			} else {
				$NewChat[] = $row->user_name;
			}
			//$i++;
			//}
		}

		//add banner showing chats with whom no previous communication
		echo "<div class='chat'>";
		echo "start a new chat";
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
