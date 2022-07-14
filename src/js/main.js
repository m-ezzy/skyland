let container = document.getElementById("container");

let MB = document.getElementById("menu_bar");
let BT = document.getElementById("button_theme");

let ba = [];
ba = document.getElementsByClassName("ba");

let buttons = [];

let common_loaded = 0;

let me = {
	user_name: '',
	first_name: '',
	last_name: '',
};

document.body.onload = function() {
	load_home();
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
class Menu {
	constructor(id, who) {
		this.element = document.getElementById(id);
		this.innerHTML = "";
		this.loaded_already = 0;
		this.open = 0;
		this.current = {
			name: "",
			rows: 0,
		};
		this.previous = [];

		this.who = who;
	}
	static current;
}
class CGC extends Menu {
	constructor(id, who) {
		super(id, who);
		this.list = [{}]

		this.bb;
		this.ts;
		this.bs;
		this.sr;
		this.cl;

		this.ch;
		this.tk;
		this.bed;
		this.ml;

		this.sending;
		this.snm;
		this.tm;
		this.bm;

	}
	initialize() {
		this.bb = this.element.getElementsByClassName("button back")[0];
		this.ts = this.element.getElementsByClassName("text search")[0];
		this.bs = this.element.getElementsByClassName("button search")[0];
		this.sr = this.element.getElementsByClassName("search_results")[0];
		this.cl = this.element.getElementsByClassName("chat_list")[0];

		this.ch = this.element.getElementsByClassName("current_header")[0];
		this.tk = this.element.getElementsByClassName("text key")[0];
		this.bed = this.element.getElementsByClassName("button e_d")[0];
		this.ml = this.element.getElementsByClassName("messages_list")[0];

		this.snm = this.element.getElementsByClassName("send_new_media")[0];
		this.tm = this.element.getElementsByClassName("text message")[0];
		this.bm = this.element.getElementsByClassName("button message")[0];
	}
	send_message() {
		if(this.tm.value == "" || this.tk.value == "") {
			return;
		}
	
		do_amazing_animation_z("55vw", "0vh", 7, "5vw", "10vh");

		let em = encryption(this.tm.value, this.tk.value);

		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				this.ml.appendChild(create_div("sent messages", "", "", this.tm.value));
				this.ml.scrollBy(0,100);
			}
		};
		xhr.open("POST", "../php/" + this.who + "/send_new_message.php?q=" + em, true);
		xhr.send();
	}
}
class Chats extends CGC {
	constructor(id, who) {
		super(id, who);
	}
}
class Groups extends CGC {
	constructor(id, who) {
		super(id, who);

		this.tam;
		this.bam;
	}
}

let home = new Menu("content_home");
let chats = new CGC("content_chats, chats");
let groups = new CGC("content_groups, groups");
let channels = new Menu("content_channels");
let games = new Menu("content_games");
let market = new Menu("content_market");







