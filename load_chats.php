<?php
	require 'server.php';

	$u = $_SESSION['user_name'];
	$_SESSION['chats'] = array();

	$chats = array();
	//$i = 0;

	//$query = "SELECT user FROM chats_$u";
	//user_info needs to be written first then chats_u table if we want user chat first
	$query = "SELECT chats_$u.user_name,user_info.first_name,user_info.last_name,user_info.extension FROM user_info INNER JOIN chats_$u ON user_info.user_name=chats_$u.user_name";
	$result = $conn->query($query);

	$rows = array();
	//$ra = array();

	//$i=0;
	
	while($row = $result->fetch_object()) {
		//$ra['chats'][] = array('user' => $row->user, 'first_name' => $row->first_name, 'last_name' => $row->last_name);

		/*
		$ru = $row->user;
		$rfn = $row->first_name;
		$rln = $row->last_name;
		$rows[] = array("user"=>$ru,"first_name"=>$rfn,"last_name"=>$rln);
		*/
		
		//$rows['chats'].push($row);
		$rows[] = $row;
		
		/*
		$ra[i]['user'] = $row["user"];
		$ra[i]['first_name'] = $row["first_name"];
		$ra[i]['last_name'] = $row["last_name"];
		*/

		//$i++;
		$chats[] = $row->user_name;
	}
	$_SESSION['chats'] = $chats;
	/*$json = json_encode($rows);
	echo $json;*/

	//$row = mysqli_fetch_assoc($result);
	
	$json = json_encode($rows);
	echo $json;

	/*
	$i=0;
	while($row = $result->fetch_object()) {
		$query_a[i] = "SELECT FirstName,LastName FROM accounts WHERE username=$row->user";
		$result_a[i] = $conn->query($query);
		$i++;
	}
	*/

	/*
	<!--
	<div id="ChatList">
		<div id="NewChat" onclick="SelectedNewChat()"></div>
	</div>
	<div id="MessagesList" onmouseover="showName(this)">
	</div>
	<form>
		<input type='text' id='TextNewMessage'>
		<input type='button' value='send' id='ButtonNewMessage' onclick='SendNewMessage()'>
	</form>
	-->
	<!--<div class="content" id="c1"><?php echo $_SESSION['username'];?></div>-->
</div>
<script src="privacy.js"></script>*/

	/*
	while($row = $result->fetch_object()) {
		$chats[] = $row->user;
	}
	$_SESSION['chats'] = $chats;
	*/
?>
