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

let MB;
let BT;

let SB;
let C;

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

let Theme = 0;
let ThemeColors = [
	["rgb(25, 25, 25)", "rgb(90, 90, 90)", "rgb(200, 200, 35)", "rgb(40, 90, 50)","rgb(255, 255, 255)"],
	["rgb(100, 100, 100)", "rgb(255, 255, 255)", "rgb(255, 255, 60)", "rgb(30, 200, 60)","rgb(0, 0, 0)"],
];

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

function toggle_theme() {
	Theme = Theme ? 0 : 1;
	C.style.backgroundColor = ThemeColors[Theme][0];

	MB.style.backgroundColor = ThemeColors[Theme][1];
	SR.style.backgroundColor = ThemeColors[Theme][1];
	
	CL.style.backgroundColor = ThemeColors[Theme][1];
	CWH.style.backgroundColor = ThemeColors[Theme][1];
	ML.style.backgroundColor = ThemeColors[Theme][1];

	for(let i=0 ; i<MS.length ; i++) {
		MS[i].style.backgroundColor = ThemeColors[Theme][2];
	}
	for(let i=0 ; i<MR.length ; i++) {
		MR[i].style.backgroundColor = ThemeColors[Theme][3];
	}
	/*
	for(let i=0 ; i<A.length ; i++) {
		A[i].style.color = ThemeColors[Theme][4];
	}
	*/
}
function VisibleOnFocus() {
	//DSU.innerHTML = "";
	SR.style.visibility = "visible";
}
function HiddenOnBlur() {
	SR.style.visibility = "hidden";
}
function SearchUser() {
	SR.style.visibility = "visible";

	/*
	if (TSU.value.length == 0) {
		CL.innerHTML = "";
		return;
	} else {
	*/
	if(TSU.value.length) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				SR.innerHTML = this.responseText;
			}
		};
		xmlhttp.open("GET", "SearchUser.php?q=" + TSU.value, true);
		xmlhttp.send();
	}
}
function TakeToThatChat(UserName) {
	//CL.innerHTML = CLinnerHTML;
	//SR.style.visibility = "hidden";
	//SR.innerHTML = "";

	show_messages(UserName);
}
function CreateNewChat(UserName) {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//SR.style.visibility = "hidden";
			//SR.innerHTML = "";
		
			//CL.innerHTML = CLinnerHTML;
			CL.innerHTML += this.responseText;

			CWH.innerHTML = UserName;

			show_messages(UserName);
		}
	};
	xmlhttp.open("POST", "CreateNewChat.php?q=" + UserName, true);
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

			SB.innerHTML = "<img src='data/ProfilePictures/" + this.responseText + "'>" + SB.innerHTML;
		}
	};
}

function ShowProfile() {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			CWH.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("POST", "show_profile_picture.php?q=" + 0, true);
	xmlhttp.send();
}
