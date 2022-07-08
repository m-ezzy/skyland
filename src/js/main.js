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
let current = {
	//user: <?php echo $_SESSION['user_name']?>,
	chat: {
		open: 0,
		name: '',
	},
	group: {
		open: 0,
		name: '',
	},
};

document.body.onload = function() {
	load_home();
}
