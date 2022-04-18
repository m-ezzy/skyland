<?php
	require 'server.php';

	$EM = $_REQUEST['q'];
	
	$u = $_SESSION['user_name'];
	$u2 = $_SESSION['chatting_with'];

	$row_number = $_SESSION['row_number'];
	$row_number += 1;
	$_SESSION['row_number'] = $row_number;

	if($u < $u2){
		$query = "INSERT INTO chat_between_$u" . "_$u2 (ROWNUM,sent_by,message) VALUES (" . $row_number . ",'" . $u . "','" . $EM . "')";
	} else {
		$query = "INSERT INTO chat_between_$u2" . "_$u (ROWNUM,sent_by,message) VALUES (" . $row_number . ",'" . $u . "','" . $EM . "')";
	}

	//$conn->query($query);
	$result = mysqli_query($conn, $query);

	/*
	echo "<div class='MessagesSent'>";
	echo $m;
	echo "</div>";
	*/
?>
