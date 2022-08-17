<?php
	require '../server.php';

	$gn = $_REQUEST['gn'];
	$au = $_REQUEST['au'];

	$u = $_SESSION['user_name'];

	$query = "SELECT user_name FROM accounts WHERE user_name=$au";
	$result = mysqli_query($conn, $query);

	if($result->num_rows) {
	    $query = "INSERT INTO group_members_$gn (members) VALUES('" . $au . "')";
		$conn->query($query);

    	$query = "INSERT INTO groups_$au (group_name) VALUES('" . $gn . "')";
		$conn->query($query);

		echo "1";
	} else {
		echo "0";
	}
?>
