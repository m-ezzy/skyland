let container = document.getElementById("container");

let MB = document.getElementById("menu_bar");
let BT = document.getElementById("button_theme");

let home = document.getElementById("content_home");
let chats = document.getElementById("content_chats");
let groups = document.getElementById("content_groups");
let channels = document.getElementById("content_channels");
let games = document.getElementById("content_games");
let market = document.getElementById("content_market");

let ba = [];
ba = document.getElementsByClassName("ba");

let BB;
let TS;
let BS;

let SR
let CL;

let CH;

let TK;
let BED;

let TAM;
let BAM;

let ML;
let MS = [];
let MR = [];

let SNM;

let BUI;
let BUV;
let BUA;
let BUD;
let BUL;

let TNM;
let BNM;

let buttons = [];

let content2 = {
	home: "",
	chats: "",
    groups: "",
    channels: "",
}
let loaded = {
	home: 0,
	chats: 0,
    groups: 0,
    channels: 0,
	games: 0,
	market: 0,
};
let current_menu = home;
let common_loaded = 0;

let content = {
	home: "",
	chats: {
		loaded_already: 0,
		CL: "",
		SR: "",
		CH: "",
		ML: "",
	},
    groups: {
		loaded_already: 0,
		CL: "",
		SR: "",
		CH: "",
		ML: "",
	},
    channels: "",
};
let me = {
	user_name: '',
	first_name: '',
	last_name: '',
};

document.body.onload = function() {
	load_home();
}
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

class menu {
	constructor() {
		this.loaded_already = 0;
		this.open = 0;
		this.current = "";

		this.CL = "";
		this.SR = "";
		this.CH = "";
		this.ML = "";
	}
	static current = "";
}





