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

let cfnmc;
let cfnmg;

let running = false;
let last_known = 5;



document.body.onload = function() {
	home = new Home('home');
	chats = new Chats('chats');
	groups = new Groups('groups');
	channels = new Channels('channels');
	games = new Games('games');

	home.clicked();

	if (resources) {
		//setInterval(check_for_new_chats, 10000);
		//setInterval(check_for_new_groups, 10000);

		cfnmc = setInterval(check_for_new_media_chats, 10000);
		cfnmg = setInterval(check_for_new_media_groups, 10000);
	}
}

function check_for_new_chats() {
	chats.check_for_new();
}
function check_for_new_groups() {
	groups.check_for_new();
}
function check_for_new_media_chats() {
	chats.check_for_new_media();
}
function check_for_new_media_groups() {
	groups.check_for_new_media();
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

function sm(e) {
	if(e.key == "Enter") {
		Content.current.send_message();
	}
}
function add_enter_event() {
	document.addEventListener("keydown", sm);

	/*let chats.tm = document.getElementById("TextNewMessage");
	chats.tm.addEventListener("keydown",send_new_message);*/
}
function remove_enter_event() {
	document.removeEventListener("keydown", sm);

	/*let chats.tm = document.getElementById("TextNewMessage");
	chats.tm.removeEventListener("keydown",send_new_message);*/
}



