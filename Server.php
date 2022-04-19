<?php
/*
$server_name = "sql302.epizy.com";
$server_user_name = "epiz_28162099";
$server_pass_word = "jBwVaUaBK0SKK";
$data_base = "epiz_28162099_db3";
*/

$server_name = "localhost";
$server_user_name = "root";
$server_pass_word = "";
$data_base = "watermelon";

$conn = new mysqli($server_name, $server_user_name, $server_pass_word, $data_base);

session_start();
/*
if (ini_get('register_globals'))
{
    foreach ($_SESSION as $key=>$value)
    {
        if (isset($GLOBALS[$key]))
            unset($GLOBALS[$key]);
    }
}
*/
/*
// User login
if (isset($_POST['login'])) {
    // Data sanitization to prevent SQL injection
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
         
    $query = "SELECT * FROM accounts WHERE username='$username' AND password='$password'";

	$results = mysqli_query($conn, $query);
  
    if(mysqli_num_rows($results) == 1) {
        $_SESSION['username'] = $username;
             
        $_SESSION['success'] = "You have logged in!";
        
		header('location: index.php');
    }
    else {
        // If the username and password doesn't match
    	array_push($errors, "Username or password incorrect");
    }
}
*/
?>
