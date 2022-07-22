let container = document.getElementById("container");

let MB = document.getElementById("menu_bar");
let BT = document.getElementById("button_theme");

let ba = [];
ba = document.getElementsByClassName("ba");

let buttons = [];

let me;

let home;
let chats;
let groups;
let channels;
let games;
let market;

let cfnm;



document.body.onload = function() {
	home = new Home('home');
	chats = new Chats('chats');
	groups = new Groups('groups');
	channels = new Channels('channels');
	games = new Games('games');
	market = new Market('market');

	home.clicked();

	if (resources) {
		cfnm = setInterval(check_for_new_media, 20000);
	}
}

function check_for_new_media() {
	chats.check_for_new_media();
}

//document.body.addEventListener("load", load_home);
/*
function attach_javascript_files() {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let files = new Array();
			files = JSON.parse(this.responseText);

			for (let file in files) {
				let s = document.createElement("script");
				s.src = file;
				document.body.appendChild(s);
			}
			load_home();
		}
	};
	xhr.open("GET", "../php/directory_js.php", true);
	xhr.send();
}
*/






