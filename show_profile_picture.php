<?php
    // Include the database configuration file
    include 'server.php';

	$u = $_SESSION['UserName'];

    // Get images from the database
    $query = "SELECT extension FROM user_info WHERE user_name='$u'";
    $result = $conn->query($query);

    $row = $result->fetch_assoc();

    $imageURL = "data/ProfilePictures/" . $u . "." . $row->extension;
    
    echo "<img src=$imageURL alt='loading picture...' width='50' height='50'/>";
?>
