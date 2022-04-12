<?php
    // Include the database configuration file
    include 'server.php';

	$u = $_SESSION['username'];

    // Get images from the database
    $query = "SELECT * FROM user_info WHERE UserName='$u'";
    $result = $conn->query($query);

    $row = $result->fetch_assoc();
    $imageURL = "images/ProfilePictures/" . $u . ".jpg";
    
    echo "<img src=$imageURL alt='' width='50' height='50'/>";
?>
