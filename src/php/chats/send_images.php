<?php
	require '../server.php';
	
	$u = $_SESSION['user_name'];
	$u2 = $_REQUEST['q'];

	$i = array_search($u2, $_SESSION['chats']['user_name']);
	$_SESSION['chats']['row_down'][$i] += 1;
	$rd = $_SESSION['chats']['row_down'][$i];

	$first = $u < $u2 ? $u : $u2;
	$second = $u < $u2 ? $u2 : $u;

    $file_name = $_FILES["select_images"]["name"];

	$temp_name = $_FILES["select_images"]["tmp_name"]; //this seems important. temp name is used by computer to give image unique id regardless of it's name

    $dir = "../../../data/chats/chat_between_" . $first . "_" . $second . "/";

	$image = $dir . basename($_FILES["select_images"]["name"]);

    $extension = strtolower(pathinfo($image, PATHINFO_EXTENSION));

	$new_file_name = $dir . $rd . "." . $extension;

	/*
	$temp = explode(".", $_FILES["file"]["name"]);
	$newfilename = round(microtime(true)) . '.' . end($temp);
	move_uploaded_file($_FILES["file"]["tmp_name"], "../img/imageDirectory/" . $newfilename);
	*/

    move_uploaded_file($temp_name, $new_file_name);

	//rename($file_name, $row_number, $image);

	$query = "INSERT INTO chat_between_$first" . "_$second (ROWNUM,sent_by,images) VALUES (" . $rd . ",'" . $u . "','" . $extension . "')";
    $conn->query($query);

    //echo $image;

    echo "chat_between_" . $first . "_" . $second . "/" . $rd . "." . $extension;
?>
