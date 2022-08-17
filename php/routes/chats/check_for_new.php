<?php
	require '../server.php';

	$u = $_SESSION['user_name'];

	$row_number = count($_SESSION['chats']['user_name']);

	$query = "SELECT *,ROW_NUMBER() OVER(ORDER BY user_name)RN FROM chats_$u WHERE ROW_NUM>" . $row_number;
	$result = $conn->query($query);

	if ($result->num_rows > 0) {
		$rows = array();
		
		while ($row = $result->fetch_object()) {
			$u2 = $row->user_name;

			$query2 = "SELECT * FROM user_info WHERE user_name=$u2";
			$result2 = $conn->query($query2);

			$rows[] = $result2;
			$_SESSION['chats']['user_name'][] = $u2;

			$first = $u < $u2 ? $u : $u2;
			$second = $u < $u2 ? $u2 : $u;

			$query3 = "SELECT COUNT(*) FROM chat_between_$first" . "_" . $second;
			$result3 = $conn->query($query3);
			$r = $result3->fetch_all();

			$_SESSION['chats']['row_up'][] = $r[0][0];
			$_SESSION['chats']['row_down'][] = $r[0][0];
		}
		echo json_encode($rows);
	} else {
		$num[0] = 0;
		echo json_encode($num);
	}
?>
