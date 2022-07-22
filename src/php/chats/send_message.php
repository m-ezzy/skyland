<?php
	require '../server.php';

	$u2 = $_REQUEST['n'];
	$m = $_REQUEST['m'];

	$u = $_SESSION['user_name'];

	$i = array_search($u2, $_SESSION['chats']['user_name']);
	$_SESSION['chats']['row_down'][$i] += 1;
	$rn = $_SESSION['chats']['row_down'][$i];

	$first = $u < $u2 ? $u : $u2;
	$second = $u < $u2 ? $u2 : $u;

	$query = "INSERT INTO chat_between_$first" . "_" . $second . "(ROWNUM,sent_by,messages) VALUES (" . $rn . ",'" . $u . "','" . $m . "')";
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
