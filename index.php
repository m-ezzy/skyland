<?php
	include 'src/php/server.php';

	if(!isset($_SESSION['user_name'])) {
   		header('location: src/php/authentication.php');
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
	<!--<link type="text/css" rel="stylesheet" href="libraries\bootstrap-5.2.0-dist/css/bootstrap.css">-->

	<link type="text/css" rel="stylesheet" href="src/css/style.css">
	<link type="text/css" rel="stylesheet" href="src/css/home.css">

	<!--<link type="text/css" rel="stylesheet" href="src/css/calls.css">-->

	<link type="text/css" rel="stylesheet" href="src/css/common.css">
	<link type="text/css" rel="stylesheet" href="src/css/chats_groups.css">
	<link type="text/css" rel="stylesheet" href="src/css/chats.css">
	<link type="text/css" rel="stylesheet" href="src/css/groups.css">

	<link type="text/css" rel="stylesheet" href="src/css/channels.css">
	<link type="text/css" rel="stylesheet" href="src/css/games.css">





	<link rel="manifest" href="src/nodejs/expressjs/phone/manifest.json">





	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>-->

	<script>
		let resources = 0; //change to 1 when you work on localhost or when have your own domain
	</script>
</head>
<body>
	<div id='container'>
		<div id='menu_bar'>
			<!-- all of this can be div tags instead of input button -->
			<!--<input type="button" onclick='load_home()' value='home'>
			<input type="button" onclick='load_frequent()' value='frequent'>-->

			<div class='button' onclick='home.clicked(this)'> home </div>
			<div class='button' onclick='calls.clicked(this)'> calls </div>
			<div class='button' onclick='chats.clicked(this)'> chats </div>
			<div class='button' onclick='groups.clicked(this)'> groups </div>
			<div class='button' onclick='channels.clicked(this)'> channels </div>
			<div class='button' onclick='games.clicked(this)'> games </div>

			<!--
			<div class='menu' onclick='load_games()'> Games </div>
			<div class='menu' onclick='load_market()'> Market </div>
			<button id='theme' onclick='toggle_theme()'> theme </button>
			-->
			<div class='button' id='button_theme' onclick='toggle_theme(this)'> theme </div>
		</div>
		
		<div class='content' id='home'></div>
		<div class='content' id='calls'>
			<div class='call-audio'>
			<h1>Phone a friend</h1>
			<p id="caststatus" class="big">
				Connecting...
			</p>
			<p>
				Please use headphones!
			</p>
			<button class="call-btn">
				Call
			</button>
			<section class="call-container" hidden>
				<div class="audio-container">
					<p>You're automatically muted, unmute yourself!</p>
					<audio controls id="remoteAudio" muted="true"></audio>
					<audio controls id="localAudio" muted="true"></audio>
				</div>
				<button class="hangup-btn">
					Hang up
				</button>
			</section>
		</div>

		<!--
		<section class="modal" hidden>
			<div id="close">
				close
			</div>
			<div class="inner-modal">
				<label>Give us your friend's device ID</label>
				<input placeholder="Enter your friend's device ID" aria-colcount="10">
				<button class="connect-btn"></button>
					Connect
				</button>
			</div>
		</section>
		-->

		</div>
		<div class='content' id='chats'></div>
		<div class='content' id='groups'></div>
		<div class='content' id='channels'></div>
		<div class='content' id='games'></div>




		<script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/davidshimjs-qrcodejs@0.0.2/qrcode.min.js"></script>
		<script src="src/js/script_calls.js"></script>




		<div class='button back' onclick='Content.current.hide_search_results()'> back </div>
		<input type='text' class='text search' placeholder='type here to search' onfocus='Content.current.show_search_results()' oninput='Content.current.search()'>
		<div class='button search' onclick='Content.current.search()'> search </div>

		<div class='search_results'></div>

		<!--
		<script>
			let media_types = ['images', 'videos', 'audios', 'document', 'location'];

			for (let i = 0 ; i < 5 ; i++) {
				let div = document.createElement("div");
				div.className = 'sending ' + media_types[i];
				document.body.appendChild(s);
				i++;
			}
		</script>
		-->

		<div class='sending'>
			<div class='button close_sending' onclick='close_images()'> + </div>
			<input type='file' name='select_images' class='select_images' accept='.jpg, .jpeg, .png'>
			<div class='button send' onclick='Content.current.send_images()'> send </div>
		</div>

		<div class='sending'>
			<div class='button close_sending' onclick='close_videos()'> + </div>
			<input type='file' name='select_videos' class='select_videos'>
			<div class='button send' onclick='Content.current.send_videos()'> send </div>
		</div>

		<div class='sending'>
			<div class='button close_sending' onclick='close_audios()'> + </div>
			<input type='file' name='select_audios' class='select_audios'>
			<div class='button send' onclick='Content.current.send_audios()'> send </div>
		</div>

		<div class='sending'>
			<div class='button close_sending' onclick='close_documents()'> + </div>
			<input type='file' name='select_documents' class='select_documents'>
			<div class='button send' onclick='Content.current.send_documents()'> send </div>
		</div>

		<div class='sending'>
			<div class='button close_sending' onclick='close_location()'> + </div>
			<input type='file' name='select_location' class='select_location'>
			<div class='button send' onclick='Content.current.send_location()'> send </div>
		</div>

		<div class='send_new_media'>
			<!--<label for='file'> image </label>-->

			<div class='button images' onclick='Content.current.select_images()'> images </div>
			<div class='button videos' onclick='Content.current.select_videos()'> videos </div>
			<div class='button audios' onclick='Content.current.select_audios()'> audios </div>
			<div class='button documents' onclick='Content.current.select_documents()'> documents </div>
			<div class='button location' onclick='Content.current.select_location()'> location </div>

			<input class='text message' type='text' placeholder='type a new message' value='hola' onfocus='Content.current.add_enter_event()' onblur='Content.current.remove_enter_event()'>
			<div class='button message' onclick='Content.current.send_message()'> send </div>
		</div>


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
			xhr.open("GET", "src/php/directory_js.php", true);
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

	<script src="../js/others.js"></script>
	<script src="../js/privacy.js"></script>-->

	<!--<script src="libraries/bootstrap-5.2.0-dist/js/bootstrap.js"></script>-->

	<script src="src/js/content/class.js"></script>
	<script src="src/js/home/class.js"></script>
	<script src="src/js/calls/class.js"></script>
	<script src="src/js/common/class.js"></script>
	<script src="src/js/chats_groups/class.js"></script>
	<script src="src/js/chats/class.js"></script>
	<script src="src/js/groups/class.js"></script>
	<script src="src/js/channels/class.js"></script>
	<script src="src/js/games/class.js"></script>

	<script src="src/js/main.js"></script>
	<script src="src/js/others.js"></script>
	<script src="src/js/privacy.js"></script>
</body>
</html>
