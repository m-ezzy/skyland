<?php
    // Include the database configuration file
    include 'server.php';

	$u = $_SESSION['user_name'];

    // Get images from the database
    $query = "SELECT * FROM user_info WHERE user_name='$u'";
    $result = $conn->query($query);

    $row = $result->fetch_assoc();

    $imageURL = "images/ProfilePictures/" . $u . ".jpg";
    
    echo "<img src=$imageURL alt='' width='50' height='50'/>";
?>
