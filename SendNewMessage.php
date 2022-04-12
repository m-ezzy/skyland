<?php
	require 'server.php';

	$m = $_REQUEST['q'];
	$u = $_SESSION['user_name'];
	$u2 = $_SESSION['ChattingWith'];
	$RowNumber = $_SESSION['RowNumber'] + 1;

	if($u < $u2){
		$query = "INSERT INTO chat_between_$u" . "_$u2(ROWNUM,sent_by,message) VALUES(" . $RowNumber . ",'" . $u . "','" . $m . "')";
	} else {
		$query = "INSERT INTO chat_between_$u2" . "_$u(ROWNUM,sent_by,message) VALUES(" . $RowNumber . ",'" . $u . "','" . $m . "')";
	}
	$conn->query($query);

	$_SESSION['RowNumber'] = $RowNumber;

	/*
	echo "<div class='MessagesSent'>";
	echo $m;
	echo "</div>";
	*/
?>
