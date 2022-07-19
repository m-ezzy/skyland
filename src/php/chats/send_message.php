<?php
	require '../server.php';

	$u2 = $_REQUEST['uu'];
	$EM = $_REQUEST['q'];

	$u = $_SESSION['user_name'];
	$u2 = $_SESSION['current']['chat'];

	$row_number = $_SESSION['row_number'];
	$row_number += 1;
	$_SESSION['row_number'] = $row_number;

	$first = $u < $u2 ? $u : $u2;
	$second = $u < $u2 ? $u2 : $u;

	$query = "INSERT INTO chat_between_$first" . "_" . $second . "(ROWNUM,sent_by,messages) VALUES (" . $row_number . ",'" . $u . "','" . $EM . "')";
	$result = $conn->query($query);

	//$result->success = 's';
	//echo json_encode($result);
	echo "1 success";

	/*
	echo "<div class='MessagesSent'>";
	echo $m;
	echo "</div>";
	*/
?>
