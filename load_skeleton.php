<?php
	require 'server.php';
	//session_start();

	//echo "<div id='container'>";
	echo "<div id='menu_bar'>";
		//sider/sideheader/navigator
		echo "<div class='menu' onclick='load_home()'> Home </div>";
		echo "<div class='menu' onclick='load_chats()'> Chats </div>";
		echo "<div class='menu' onclick='load_groups()'> Groups </div>";
		echo "<div class='menu' onclick='load_communities()'> Communities </div>";
		echo "<div class='menu' onclick='load_games()'> Games </div>";
		echo "<div class='menu' onclick='load_market()'> Market </div>";
		echo "<div class='menu' id='button_theme' onclick='toggle_theme()'> Theme </div>";
	echo "</div>";

	echo "<div id='side_bar'>";
	echo "</div>";

	echo "<div id='content'>";
		echo "<p>ki</p>";
		/*
		echo "<script>qqq = <?php echo $";
		echo "_SESSION['user_name']; ?>;alert(qqq);</script>";
		*/
	echo "</div>";
	//echo "</div>";
	
	//echo "<script src='main.js'></script>";
	
	//header('location: index.php');
?>
