<?php
	require '../server.php';

	$u = $_SESSION['user_name'];
	$_SESSION['chats'] = array();

	$chats = array();
	$rows = array();

	$query = "SELECT chats_$u.user_name,user_info.first_name,user_info.last_name,user_info.extension FROM user_info INNER JOIN chats_$u ON user_info.user_name=chats_$u.user_name";
	$result = $conn->query($query);
	
	while($row = $result->fetch_object()) {
		echo $row->user_name + " ";
		echo $row->first_name + " ";
		echo $row->last_name + " ";
		echo $row->extension + " ";

		//$rows[] = $row;
		
		/*$ra[i]['user'] = $row["user"];
		$ra[i]['first_name'] = $row["first_name"];
		$ra[i]['last_name'] = $row["last_name"];*/

		$chats[] = $row->user_name;
	}
	$_SESSION['chats'] = $chats;

	//echo $rows;
?>
