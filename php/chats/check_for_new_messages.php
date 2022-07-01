<?php
	require '../server.php';

	$u = $_SESSION['user_name'];
	$u2 = $_SESSION['current']['chat'];
	$row_number = $_SESSION['row_number'];

	$i = 0;

	if($u < $u2){
		$query = "SELECT * FROM chat_between_$u"."_$u2 WHERE ROWNUM>" . $row_number;
	} else {
		$query = "SELECT * FROM chat_between_$u2"."_$u WHERE ROWNUM>" . $row_number;
	}
	$result = $conn->query($query);

	if($result->num_rows > 0) {
		$rows = array();
	
		while($row = $result->fetch_object()) {
			if($row->sent_by == $u2) {

				$rows[] = $row->message;
				//$RowsArray[] = $row->time;
				$i++;
				
				/*echo "<div class='MessagesReceived'>";
				echo $row->message;
				echo "</div>";*/
		
				$row_number++;
				/*$_SESSION['RowNumber'] = $RowNumber;*/
			}
		}
		$_SESSION['row_number'] = $row_number;

		echo json_encode($rows);
	}
?>
