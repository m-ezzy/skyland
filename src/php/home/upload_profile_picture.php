<?php
/*
	require 'server.php';

	$u = $_SESSION['user_name'];
	$msg = "";
  
	$FileName = 'jpg';
	$FileName = $_FILES["uploadfile"]["name"];
	$tempname = $_FILES["uploadfile"]["tmp_name"];
	$Folder = "images/" . $FileName;
  
	// Get all the submitted data from the form
	$query = "UPDATE user_info SET ext = '$FileName' WHERE user_name='$u'";
	mysqli_query($conn, $query);

	// Now let's move the uploaded image into the folder: image
	if (move_uploaded_file("as", "images/as")) {
		$msg = "Image uploaded successfully";
	} else {
		$msg = "Failed to upload image";
	}

	if (move_uploaded_file($_FILES[$array_name]['tmp_name'], $path . $imageName))
	{
		echo json_encode(['success' => 1]);
		return (true);
	}
	else
	{
		echo json_encode(['success' => 0]);
		return (false);
	}
	}
	if ($_FILES['image']['name'] != '') {
		$image = $_FILES['image']['name'];
		uploadImage('image', $image, 'images/');
	}
*/

	require '../server.php';
	$u = $_SESSION['user_name'];

	$file_name = $_FILES["file_pp"]["name"];
	$temp_name = $_FILES["file_pp"]["tmp_name"];

    $dir = "../../../data/profile_pictures/";

	$image = $dir . basename($_FILES["file_pp"]["name"]);
    
	$extension = strtolower(pathinfo($image, PATHINFO_EXTENSION));

	$new_file_name = $dir . $u . "." . $extension;

	move_uploaded_file($_FILES['file_pp']['tmp_name'], $new_file_name);

	$query = "UPDATE user_info SET extension = '$extension' WHERE user_name='$u'";
	$conn->query($query);

	echo $extension;

	/*
	// Check file size
	if ($_FILES["file_pp"]["size"] > 500000) {
		echo "Sorry, your file is too large.";
	}
	*/
?>
