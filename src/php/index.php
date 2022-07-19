<?php
	include 'server.php';

	if(!isset($_SESSION['user_name'])) {
   		header('location: authentication.php');
	}
?>

<!--<!DOCTYPE html>-->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title> skyland! </title>

	<!--<link rel="icon" href="../../media/images/icon2.ico">-->

	<!--
	<link type="text/css" rel="stylesheet" href="common.css">
	<link type="text/css" rel="stylesheet" href="authentication.css">
	<link type="text/css" rel="stylesheet" href="s_home.css">
	-->

	<link type="text/css" rel="stylesheet" href="../css/style.css">
	<link type="text/css" rel="stylesheet" href="../css/home.css">

	<link type="text/css" rel="stylesheet" href="../css/common.css">
	<link type="text/css" rel="stylesheet" href="../css/chats.css">
	<link type="text/css" rel="stylesheet" href="../css/groups.css">

	<link type="text/css" rel="stylesheet" href="../css/channels.css">
	<link type="text/css" rel="stylesheet" href="../css/games.css">
	<link type="text/css" rel="stylesheet" href="../css/market.css">



	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>-->

	<script>
		let resources = 1;
	</script>
</head>
<body>
	<div id='container'>
		<div id='menu_bar'>
			<!-- all of this can be div tags instead of input button -->
			<!--<input type="button" onclick='load_home()' value='home'>
			<input type="button" onclick='load_frequent()' value='frequent'>-->

			<div class='button' onclick='load_home(this)'> home </div>
			<div class='button' onclick='load_chats(this)'> chats </div>
			<div class='button' onclick='load_groups(this)'> groups </div>
			<div class='button' onclick='load_channels(this)'> channels </div>
			<div class='button' onclick='load_games(this)'> games </div>
			<div class='button' onclick='load_market(this)'> market </div>
			
			<!--
			<div class='menu' onclick='load_games()'> Games </div>
			<div class='menu' onclick='load_market()'> Market </div>
			<button id='theme' onclick='toggle_theme()'> theme </button>
			-->
			<div class='button' id='button_theme' onclick='toggle_theme(this)'> theme </div>
		</div>
		
		<div class='content' id='home'></div>
		<div class='content' id='chats'></div>
		<div class='content' id='groups'></div>
		<div class='content' id='channels'></div>
		<div class='content' id='games'></div>
		<div class='content' id='market'></div>

		<!--
		<script>
			let media_types = ['images', 'videos', 'audios', 'document', 'location'];

			for (let i = 0 ; i < 5 ; i++) {
				let div = document.createElement("div");
				div.className = 'sending ' + media_types[i];
				document.body.appendChild(s);
				i++;
			}
		-->

		<div class='sending'>
			<div class='button close_sending' onclick='close_images()'> + </div>
			<input type='file' name='select_images' class='select_images' accept='.jpg, .jpeg, .png'>
			<div class='button send' onclick='send_images()'> send </div>
		</div>

		<div class='sending'>
			<div class='button close_sending' onclick='close_videos()'> + </div>
			<input type='file' name='select_videos' class='select_videos'>
			<div class='button send' onclick='send_videos()'> send </div>
		</div>

		<div class='sending'>
			<div class='button close_sending' onclick='close_audios()'> + </div>
			<input type='file' name='select_audios' class='select_audios'>
			<div class='button send' onclick='send_audios()'> send </div>
		</div>

		<div class='sending'>
			<div class='button close_sending' onclick='close_documents()'> + </div>
			<input type='file' name='select_documents' class='select_documents'>
			<div class='button send' onclick='send_documents()'> send </div>
		</div>

		<div class='sending'>
			<div class='button close_sending' onclick='close_location()'> + </div>
			<input type='file' name='select_location' class='select_location'>
			<div class='button send' onclick='send_location()'> send </div>
		</div>

		<!--
		<div class='send_new_media'>
			<label for='file'> image </label>

			<div class='button images' onclick='select_images()'> images </div>
			<div class='button videos' onclick='select_videos()'> videos </div>
			<div class='button audios' onclick='select_audios()'> audios </div>
			<div class='button documents' onclick='select_documents()'> documents </div>
			<div class='button location' onclick='select_location()'> location </div>

			<input class='text message' type='text' placeholder='type a new message' onfocus='add_enter_event()' onblur='remove_enter_event()'>
			<div class='button message' onclick='send_message()'> send </div>
		</div>-->

		<!--
		</script>-->

		<div class='ba' id='ba1'></div>
		<div class='ba' id='ba2'></div>
		<div class='ba' id='ba3'></div>
		<div class='ba' id='ba4'></div>
		<div class='ba' id='ba5'></div>
	</div>

	<!--<script>
		function append_js_script_files() {
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					let files = new Array();
					files = JSON.parse(this.responseText);

					console.log(files);

					let i = 0;
					while (i < files.length) {
						if(files[i] == "../js/a.js") {
							i++;
							continue;
						}
						let s = document.createElement("script");
						s.src = files[i];
						document.body.appendChild(s);
						i++;
					}
				}
			};
			xhr.open("GET", "directory_js.php", true);
			xhr.send();
		}
		append_js_script_files();
	</script>-->

	<!--
	<script src="../js/main.js"></script>

	<script src="../js/home.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/chats.js"></script>
	<script src="../js/groups.js"></script>
	<script src="../js/channels.js"></script>
	<script src="../js/games.js"></script>
	<script src="../js/market.js"></script>

	<script src="../js/others.js"></script>
	<script src="../js/privacy.js"></script>-->

	<script src="../js/home/home.js"></script>
	<script src="../js/home/load.js"></script>
	<script src="../js/chats/chats.js"></script>
	<script src="../js/chats/load.js"></script>
	<script src="../js/groups/groups.js"></script>
	<script src="../js/groups/load.js"></script>
	<script src="../js/channels/channels.js"></script>
	<script src="../js/games/games.js"></script>

	<script src="../js/classes/Content.js"></script>
	<script src="../js/classes/Home.js"></script>
	<script src="../js/classes/Common.js"></script>
	<script src="../js/classes/ChatsGroups.js"></script>
	<script src="../js/classes/Chats.js"></script>
	<script src="../js/classes/Groups.js"></script>
	<script src="../js/classes/Channels.js"></script>
	<script src="../js/classes/Games.js"></script>
	<script src="../js/classes/Market.js"></script>

	<script src="../js/main.js"></script>
	<script src="../js/others.js"></script>
	<script src="../js/privacy.js"></script>
</body>
</html>
