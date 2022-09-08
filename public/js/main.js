let container = document.getElementById("container");

let MB = document.getElementById("menu_bar");
let BT = document.getElementById("button_theme");

let menus = ['calls', 'chats', 'groups', 'channels', 'games', 'profiles'];

let ba = [];
ba = document.getElementsByClassName("ba");

let buttons = [];

let me;

let calls;
let chats;
let groups;
let channels;
let games;
let profiles;

let content1 = {};

let cfnmc;
let cfnmg;

let running = false;
let last_known = 5;

let resources = 1; //change to 1 when you work on localhost or when have your own domain
/*
let backEnd = {
	lang: 'php',
	pre: '../php/routes/',
	suf: '.php',
};*/
let backEnd = {
	lang: 'nodejs',
	pre: '/',
	suf: '',
};

//innerwidth <= 400 is mobile UI
let screen_mobile = 400;

document.body.onload = function() {
	calls = new Calls('calls');
	chats = new Chats('chats');
	groups = new Groups('groups');
	channels = new Channels('channels');
	games = new Games('games');
	profiles = new Profiles('profiles');

	profiles.handleClick();
	chats.handleClick();
	//calls.clicked();

	if (resources) {
		//setInterval(check_for_new_chats, 10000);
		//setInterval(check_for_new_groups, 10000);

		//cfnmc = setInterval(check_for_new_media_chats, 10000);
		//cfnmg = setInterval(check_for_new_media_groups, 10000);
	}

	Notification.requestPermission().then((result) => {
		console.log(result);
	});

	console.log(window.location);
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

