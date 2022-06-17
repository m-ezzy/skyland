class Element { //Node
	constructor(x, y, w, h, color) {
		this.element = this.createElement();

		this.x = x;
		this.y = y;

		this.width = w;
		this.height = h;

		this.color = color;

		this.text;
	}
	createElement() {
		let NewElement = document.createElement("div");

		return NewElement;
	}
	createElement(id) {
		let NewElement = document.createElement("div");
		NewElement.id = id;

		return NewElement;
	}
	createElement(id, text) {
		let NewElement = document.createElement("div");
		NewElement.id = id;

		let NewText = document.createTextNode(text);
		NewElement.appendChild(NewText);

		return NewElement;
	}
	setID(id) {

	}
	appendText(text) {

	}
}

function CreateDivTag(className, text) {
	let NewElement = document.createElement("div");
	NewElement.className = className;
	//NewElement.id = id;

	let textNode = document.createTextNode(text);
	NewElement.appendChild(textNode);

	return NewElement;
}

/*
let MB = document.getElementById("MenuBar");
let BT = document.getElementById("ButtonTheme");

let C = document.getElementById("Container");

let TSU = document.getElementById("TextSearchUser");
let BSU = document.getElementById("ButtonSearchUser");

let CL = document.getElementById("ChatList");
let CLinnerHTML;

let ML = document.getElementById("MessagesList");

let TNM = document.getElementById("TextNewMessage");
let BNM = document.getElementById("ButtonNewMessage");
*/
let A;

let MB = document.getElementById("menu_bar");
let BT = document.getElementById("toggle_theme");

let BB;
let TSU;
let BSU;

let SR

let CL;

let CWH;

let TK;
let BED;

let ML;
let MS;
let MR;

let BCNM;
let TNM;
let BNM;

let theme = 8;

let ThemeColors = [
	["rgb(25, 25, 25)", "rgb(90, 90, 90)", "rgb(200, 200, 35)", "rgb(40, 90, 50)","rgb(255, 255, 255)"],
	["rgb(100, 100, 100)", "rgb(255, 255, 255)", "rgb(255, 255, 60)", "rgb(30, 200, 60)","rgb(0, 0, 0)"],
];

let theme_names = ["apple","cherry","grapes","mango","orange","pineapple","pumpkin","strawberry","watermelon"];
/*
function showName(content) {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			content.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("POST", "display.php?q=" + '1', true);
	xmlhttp.send();
}
*/

$(document).ready(function() {
	$("#button_theme").click(function() {
		$(".MessagesSent").style.backgroundColor = "green";
	});
});

function toggle_theme() {
	if(theme == theme_names.length - 1) {
		theme = 0;
	} else {
		theme++;
	}

	MB.style.backgroundImage = "url(../media/images/skins/" + theme_names[theme] + "/menu_bar.jpg)";
	CL.style.backgroundImage = "url(../media/images/skins/" + theme_names[theme] + "/chat_list.jpg)";
	ML.style.backgroundImage = "url(../media/images/skins/" + theme_names[theme] + "/messages_list.jpg)";

	/*
	for(let i=0 ; i<MS.length ; i++) {
		MS[i].style.backgroundColor = ThemeColors[Theme][2];
	}
	for(let i=0 ; i<MR.length ; i++) {
		MR[i].style.backgroundColor = ThemeColors[Theme][3];
	}
	for(let i=0 ; i<A.length ; i++) {
		A[i].style.color = ThemeColors[Theme][4];
	}
	*/
}
function search_results_hidden() {
	SR.style.visibility = "hidden";
}
function search_results_visible() {
	SR.style.visibility = "visible";
}
function search_user() {
	if(TSU.value == "") {
		return;
	}

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			SR.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("GET", "search_user.php?q=" + TSU.value, true);
	xmlhttp.send();
}
function take_to_that_chat(user_name) {
	//CL.innerHTML = CLinnerHTML;
	SR.style.visibility = "hidden";
	//SR.innerHTML = "";

	show_messages(user_name);
}
function create_new_chat(user_name) {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//SR.style.visibility = "hidden";
			//SR.innerHTML = "";
		
			//CL.innerHTML = CLinnerHTML;
			CL.innerHTML += this.responseText;

			SR.style.visibility = "hidden";
		
			show_messages(user_name);
		}
	};
	xmlhttp.open("POST", "create_new_chat.php?q=" + user_name, true);
	xmlhttp.send();
}
function upload_profile_picture() {
	let xhr = new XMLHttpRequest();

	let file = document.getElementById('file_pp').files[0];
	
	let fd = new FormData();
	fd.append("file_pp", file);

	xhr.open("POST", "upload_profile_picture.php", true);
	//xhr.setRequestHeader("Content-type","image");
	xhr.send(fd);

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200) {
			SB.removeChild(document.getElementById("file_pp"));
			SB.removeChild(document.getElementById("button_pp"));

			SB.innerHTML = "<img src='../data/profile_pictures/" + this.responseText + "'>" + SB.innerHTML;
		}
	};
}
function show_profile() {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			CWH.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("POST", "show_profile_picture.php?q=" + 0, true);
	xmlhttp.send();
}
function snm(e) {
	if(e.key == "Enter") {
		send_new_message();
	}
}
function add_event() {
	document.addEventListener("keydown",snm);

	/*let TNM = document.getElementById("TextNewMessage");
	TNM.addEventListener("keydown",send_new_message);*/
}
function remove_event() {
	document.removeEventListener("keydown",snm);

	/*let TNM = document.getElementById("TextNewMessage");
	TNM.removeEventListener("keydown",send_new_message);*/
}
