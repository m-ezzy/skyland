let container = document.getElementById("container");

let MB = document.getElementById("menu_bar");
let BT = document.getElementById("button_theme");

let ba = [];
ba = document.getElementsByClassName("ba");

let buttons = [];

let me;

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
class Content {
	constructor(who) {
		this.element = document.getElementById(who);
		this.innerHTML = "";
		this.loaded_already = 0;
		this.open = 0;
		this.current = 0;
		this.previous = [];

		this.who = who;
	}
	static current;
	
	hide_search_results() {
		this.sr.style.visibility = "hidden";
	}
	show_search_results() {
		this.sr.style.visibility = "visible";
	}
}
class Home extends Content {
	constructor(who) {
		super(who);
	}
	upload_profile_picture() {
		let xhr = new XMLHttpRequest();
	
		let file = document.getElementById('file_pp').files[0];

		let fd = new FormData();
		fd.append("file_pp", file);
	
		xhr.open("POST", "../php/home/upload_profile_picture.php", true);
		//xhr.setRequestHeader("Content-type","image");
		xhr.send(fd);
	
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200) {
				/*C.removeChild(document.getElementById("file_pp"));
				C.removeChild(document.getElementById("button_pp"));*/

				home.innerHTML = "<img src='../../data/profile_pictures/" + this.responseText + "' id='profile_picture'>";
			}
		};
	}
}
class Common extends Content {
	constructor(who) {
		super(who);

		this.bb;
		this.ts;
		this.bs;
		this.sr;
		this.cl;

		this.ch;
		this.tk;
		this.bed;
		//this.conversation = [];
		//this.ml;

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
		//this.ml = this.element.getElementsByClassName("messages_list")[0];

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
class Chats extends Common {
	constructor(who) {
		super(who);
	}
}
class Groups extends Common {
	constructor(who) {
		super(who);

		this.tam;
		this.bam;
	}
}
class Channels extends Common {
	constructor(who) {
		super(who);
	}
}
class Games extends Content {
	constructor(who) {
		super(who);
	}
}
class Market extends Content {
	constructor(who) {
		super(who);
	}
}



let home = new Home("home");
let chats = new Chats("chats");
let groups = new Groups("groups");
let channels = new Channels("channels");
let games = new Games("games");
let market = new Market("market");











