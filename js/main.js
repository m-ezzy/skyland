let container = document.getElementById("container");

let MB = document.getElementById("menu_bar");
let BT = document.getElementById("button_theme");

let C = document.getElementById("content");

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

//groups
let BBG,
	TSG,
	BSG,
	
	SRG,
	GL,
	
	HG,

	MLG,
	TNMG,
	BNMG;

let ba = [];
ba = document.getElementsByClassName("ba");

let content = {
	home: "",
	chats: "",
    groups: "",
    channels: "",
}

let content2 = {
	home: "",
	chats: {
		CL: "",
		CH: "",
		ML: "",
	},
    groups: "",
    channels: "",
}

let me = {
	user_name: '',
	first_name: '',
	last_name: '',
}
let current = {
	//user: <?php echo $_SESSION['user_name']?>,
	chat: '',
	group: '',
};

document.body.onload = function() {
	load_home();
}
