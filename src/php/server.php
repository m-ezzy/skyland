<?php

$server_name = "localhost";
$server_user_name = "root";
$server_pass_word = "";
$data_base = "skyland";

/*
$server_name = "sql302.epizy.com";
$server_user_name = "epiz_28162099";
$server_pass_word = "jBwVaUaBK0SKK";
$data_base = "epiz_28162099_skyland";
*/
/*
$server_name = "remotemysql.com";
$server_user_name = "09FcFysOWd";
$server_pass_word = "0DhWtjLTdQ";
$data_base = "09FcFysOWd";
*/

$conn = new mysqli($server_name, $server_user_name, $server_pass_word, $data_base);

//$conn = new mysqli("localhost", "root", "", "fruits");
//$conn = new mysqli("sql302.epizy.com", "epiz_28162099", "jBwVaUaBK0SKK", "epiz_28162099_fruits");

session_start();

$limit = 5;
?>
