<?php
	require 'server.php';

	$s = $_REQUEST['q'];
	$u = $_SESSION['user_name'];

	$i = 0;
	$NewChat = array();

	// lookup all hints from array if $q is different from ""
    $s = strtolower($s);

	$query = "SELECT UserName FROM accounts WHERE UserName LIKE '" . $s . "%'";
	$result = mysqli_query($conn, $query);

	if($result->num_rows == 0) {
		echo "<div class='Chat'>";
		echo "No Such UserName Found.";
		echo "</div>";
	} else {

	//add banner showing already created chats
	echo "<div class='Chat'>";
	echo "Previous Chats";
	echo "</div>";

	while($row = $result->fetch_object()) {
		$i = 0;
		//while($Chat = $_SESSION['Chats'][$i]) {
		$i = array_search($row->UserName,$_SESSION['Chats']);

		if($i OR $i === 0) {
			echo "<div class='Chat' onclick='TakeToThatChat(" . $row->UserName . ")'>";
			echo $row->UserName;
			echo "</div>";
		} else {
			$NewChat[] = $row->UserName;
		}
		//$i++;
		//}
	}

	//add banner showing chats with whom no previous communication
	echo "<div class='Chat'>";
	echo "Start a New Chat";
	echo "</div>";

	foreach($NewChat as $NC) {
		echo "<div class='Chat' onclick='CreateNewChat(" . $NC . ")'>";
		//echo "<div class='Chat' onclick='CreateNewChat(";
		//echo "'$NC'";
		//echo ")'>";
		echo $NC;
		echo "</div>";
	}
	}
?>
