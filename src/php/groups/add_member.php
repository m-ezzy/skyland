<?php
	require '../server.php';

	$user_to_add = $_REQUEST['q'];

	$u = $_SESSION['user_name'];
	$gn = $_SESSION['current']['group'];

	$query = "SELECT user_name FROM accounts WHERE user_name=$user_to_add";
	$result = mysqli_query($conn, $query);

	if($result->num_rows) {
	    $query = "INSERT INTO group_members_$gn (members) VALUES('" . $user_to_add . "')";
		$conn->query($query);

    	$query = "INSERT INTO groups_$user_to_add (names) VALUES('" . $gn . "')";
		$conn->query($query);

		echo "1";
	} else {
		echo "0";
	}
?>
