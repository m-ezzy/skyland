let container = document.getElementById("container");

let MB = document.getElementById("menu_bar");
let BT = document.getElementById("button_theme");

let CO = document.getElementById("content");

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

let ba = [];
ba = document.getElementsByClassName("ba");

let content2 = {
	home: "",
	chats: "",
    groups: "",
    channels: "",
}

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
}

let me = {
	user_name: '',
	first_name: '',
	last_name: '',
}
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
