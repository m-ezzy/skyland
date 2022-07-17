<?php
	require '../server.php';
	
	$u = $_SESSION['my']['user_name'];
	$u2 = $_SESSION['current']['chat'];

	$row_number = $_SESSION['row_number'];
	$row_number += 1;
	$_SESSION['row_number'] = $row_number;

	$first = $u < $u2 ? $u : $u2;
	$second = $u < $u2 ? $u2 : $u;

    $file_name = $_FILES["select_videos"]["name"];

	$temp_name = $_FILES["select_videos"]["tmp_name"];

    $dir = "../../../data/chats/chat_between_" . $first . "_" . $second . "/";

	$video = $dir . basename($_FILES["select_videos"]["name"]);

    $extension = strtolower(pathinfo($video, PATHINFO_EXTENSION));

	$new_file_name = $dir . $row_number . "." . $extension;

/*
	$temp = explode(".", $_FILES["file"]["name"]);
	$newfilename = round(microtime(true)) . '.' . end($temp);
	move_uploaded_file($_FILES["file"]["tmp_name"], "../img/imageDirectory/" . $newfilename);
*/

    move_uploaded_file($temp_name, $new_file_name);

	//rename($file_name, $row_number, $image);

	$query = "INSERT INTO chat_between_$first" . "_$second (ROWNUM,sent_by,videos) VALUES (" . $row_number . ",'" . $u . "','" . $extension . "')";
    $conn->query($query);

    //echo $image;

    echo $first . "_" . $second . "/" . $row_number . "." . $extension;
?>
