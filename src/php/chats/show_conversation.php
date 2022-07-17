<?php
	require '../server.php';

	$u = $_SESSION['my']['user_name'];
	$u2 = $_REQUEST['q'];

	$_SESSION['current']['chat'] = $u2;

	//$_SESSION['row_number'] = 0;
	$row_number = 0;

	$first = $u;
	$second = $u2;

	if($u > $u2) {
		$first = $u2;
		$second = $u;
	}

	//$query = "SELECT sent_by,message,images,videos,audios,documents,location FROM chat_between_$first" . "_" . $second";
	$query = "SELECT * FROM chat_between_$first" . "_" . $second;
	$result = $conn->query($query);
	//$result = mysqli_query($conn, $query);

	/*echo "<form><input type='text' id='NewMessage'><input type='button' value='send' onclick='TypeNewMessage()'></form>";*/

	$rows = array();

	while($r = $result->fetch_object()) {
		$rows[] = $r;

		$row_number++;
	}
	
	$json = json_encode($rows);
	echo $json;


	/*
	$row_number = $result->num_rows();
	$rrr = $result->fetch_all();
	$json = json_encode($rrr);
	echo $json;
	*/


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
	$_SESSION['row_number'] = $row_number;
?>
