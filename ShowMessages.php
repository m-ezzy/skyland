<?php
	require 'server.php';

	$u2 = $_REQUEST['q'];
	$u = $_SESSION['username'];
	$_SESSION['ChattingWith'] = $u2;
	$_SESSION['RowNumber'] = 0;
	$RowNumber = 0;

	$first = $u;
	$second = $u2;

	if($u >= $u2) {
		$first = $u2;
		$second = $u;
	}

	$query = "SELECT sent_by,message FROM chat_between_$first" . "_$second";
	//$result = $conn->query($query);
	$result = mysqli_query($conn, $query);

	/*echo "<form><input type='text' id='NewMessage'><input type='button' value='send' onclick='TypeNewMessage()'></form>";*/

	$rows = array();

	while($r = $result->fetch_object()) {
		$rows[] = $r;
	}
	
	$json_array = json_encode($rows);
	echo $json_array;

	/*
	while($row = $result->fetch_object()) {


		if($row->sent_by == $u) {
			echo "<div class='MessagesSent'>";
		} else {
			echo "<div class='MessagesReceived'>";
		}
		echo $row->message;
		echo "</div>";

		$RowNumber++;
		/*$_SESSION['RowNumber'] = $RowNumber;*//*
	}
	*/
	$_SESSION['RowNumber'] = $RowNumber;
?>
