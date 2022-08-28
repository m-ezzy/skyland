<?php
    require '../server.php';

    $u = $_SESSION["user_id"];
    $pi = $_POST["peer_id"];

    $query = "UPDATE peer_id SET peer_id='$pi' WHERE user_id=$u";
	$conn->query($query);

	echo '1';
?>
