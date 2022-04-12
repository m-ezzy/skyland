<?php
	require 'server.php';

	$u = $_SESSION['user_name'];
	$u2 = $_SESSION['ChattingWith'];
	$RowNumber = $_SESSION['RowNumber'];
	
	$RowsArray = array();
	$i = 0;

	if($u < $u2){
		$query = "SELECT * FROM chat_between_$u"."_$u2 WHERE ROWNUM>" . $RowNumber;
	} else {
		$query = "SELECT * FROM chat_between_$u2"."_$u WHERE ROWNUM>" . $RowNumber;
	}
	$result = $conn->query($query);

	if($result->num_rows > 0) {
		while($row = $result->fetch_object()) {
			if($row->sent_by == $u2) {

				$RowsArray[] = $row->message;
				//$RowsArray[] = $row->time;
				$i++;
				
				/*echo "<div class='MessagesReceived'>";
				echo $row->message;
				echo "</div>";*/
		
				$RowNumber++;
				/*$_SESSION['RowNumber'] = $RowNumber;*/
			}
		}
		$_SESSION['RowNumber'] = $RowNumber;
		$resultJSON = json_encode($RowsArray);
		echo $resultJSON;
	}
?>
