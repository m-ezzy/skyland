<?php
    require '../server.php';

    $u = $_SESSION["user_name"];
    $pi = $_POST["peer_id"];

    $query = "UPDATE peer_ids SET peer_id='$pi' WHERE user_name='$u'";
	$conn->query($query);

	echo '1';
?>
