<?php
	require 'server.php';

	$u = $_SESSION['username'];
	$_SESSION['Chats'] = array();

	$Chats = array();
	//$i = 0;

	//$query = "SELECT user FROM chats_$u";
	//user_info needs to be written first then chats_u table if we want user chat first
	$query = "SELECT chats_$u.user,user_info.FirstName,user_info.LastName FROM user_info INNER JOIN chats_$u ON user_info.UserName=chats_$u.user";
	$result = $conn->query($query);

	/*
	$i=0;
	while($row = $result->fetch_object()) {
		$query_a[i] = "SELECT FirstName,LastName FROM accounts WHERE username=$row->user";
		$result_a[i] = $conn->query($query);
		$i++;
	}
	*/

	echo "<form>";
	echo "<input type='text' placeholder='Type a User Name' id='TextSearchUser' onfocus='VisibleOnFocus()' onblur='HiddenOnBlur()'>";
	echo "<input type='button' value='Search User' id='ButtonSearchUser' onclick='SearchUser()'>";
	echo "</form>";

	echo "<div id='SearchResults'></div>";

	echo "<div id='ChatList'>";
	while($row = $result->fetch_object()) {
		echo "<div class='Chat' onclick='ShowMessages(" . $row->user . ")'>";
		
		/*
		//image downloading and displaying
		$query = "SELECT image FROM user_info WHERE user_name=" . $u;
		$result2 = $conn->query($query);
		$row2 = $result2->fetch_object();

		header("Content-type: image/jpg");
		echo $row2->image;
		*/

		echo $row->FirstName . " " . $row->LastName;
		echo "</div>";

		$Chats[] = $row->user;
		//$i++;
	}
	$_SESSION['Chats'] = $Chats;
	echo "</div>";

	echo "<div id='ProfileHeader' onclick='ShowProfile()'>";
	echo $u;
	echo "</div>";

	echo "<input type='text' placeholder='Enter key of this conversation' id='TextKey'>";
	echo "<input type='button' value='Encrypt' id='ButtonEorD' onclick='EorD()'>";

	echo "<div id='MessagesList'>";
	echo "Select any chat to show your messages with them here";
	echo "</div>";

	echo "<form>";
	echo "<input type='button' value='Check For New Messages' id='ButtonCheckForNewMessages' onclick='CheckForNewMessages()'>";
	echo "<input type='text' placeholder='Type a new message' id='TextNewMessage'>";
	echo "<input type='button' value='send' id='ButtonNewMessage' onclick='SendNewMessage()'>";
	echo "</form>";
?>
