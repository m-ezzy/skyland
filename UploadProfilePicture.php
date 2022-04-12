<?php
	require 'server.php';

	$u = $_SESSION['username'];
	$msg = "";
  
	$FileName = 'sdf';
	//$FileName = $_FILES["uploadfile"]["name"];
	//$tempname = $_FILES["uploadfile"]["tmp_name"];
	$Folder = "images/" . $FileName;
  
	// Get all the submitted data from the form
	$query = "UPDATE user_info SET image = '$FileName' WHERE UserName='$u'";
	mysqli_query($conn, $query);

	// Now let's move the uploaded image into the folder: image
	if (move_uploaded_file("as", "images/as")) {
		$msg = "Image uploaded successfully";
	} else {
		$msg = "Failed to upload image";
	}
?>
