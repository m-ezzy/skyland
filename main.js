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

let MB = document.getElementById("MenuBar");
let BT = document.getElementById("ButtonTheme");

let C = document.getElementById("Container");

let TSU;
let BSU;

let SR

let CL;
//let CLinnerHTML;

let PH;
let TK;
let BED;

let ML;
let MS;
let MR;

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
function SelectedMenuHome() {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			C.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("POST", "LoadHome.php?", true);
	xmlhttp.send();
}
function SelectedMenuChats() {
	/*let NewChat = document.getElementById("NewChat");
	NewChat.style.visibility = "visible";*/

	/*
	arr.push(document.createElement("div"));
	textNode.push(document.createTextNode(string[i]));
	arr[i].appendChild(textNode[i]);
	document.getElementById("master").appendChild(arr[i]);
	*/

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			C.innerHTML = this.responseText;

			//A = document.getElementsByClassName("*");

			C = document.getElementById("Container");

			TSU = document.getElementById("TextSearchUser");
			BSU = document.getElementById("ButtonSearchUser");

			SR = document.getElementById("SearchResults");

			CL = document.getElementById("ChatList");

			PH = document.getElementById("ProfileHeader");

			TK = document.getElementById("TextKey");
			BED = document.getElementById("ButtonEorD");

			ML = document.getElementById("MessagesList");

			TNM = document.getElementById("TextNewMessage");
			BNM = document.getElementById("ButtonNewMessage");

			if(server == "localhost") {
				/*
				TSU.setAttribute(onkeyup:'SearchUser(this.value)');
				don't know this works or not
				alternatively i can simply add event listener
				*/

				TSU.addEventListener("keyup",function(e) {
					SearchUser();
				});
			}
		}
	};
	xmlhttp.open("POST", "LoadChat.php?", true);
	xmlhttp.send();
}
function ToggleTheme() {
	Theme = Theme ? 0 : 1;
	C.style.backgroundColor = ThemeColors[Theme][0];

	MB.style.backgroundColor = ThemeColors[Theme][1];
	SR.style.backgroundColor = ThemeColors[Theme][1];
	
	CL.style.backgroundColor = ThemeColors[Theme][1];
	PH.style.backgroundColor = ThemeColors[Theme][1];
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
	SR.style.visibility = "hidden";
	SR.innerHTML = "";

	ShowMessages(UserName);
}
function CreateNewChat(UserName) {
	SR.style.visibility = "hidden";
	SR.innerHTML = "";

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//CL.innerHTML = CLinnerHTML;
			CL.innerHTML += this.responseText;

			PH.innerHTML = UserName;

			ShowMessages(UserName);
		}
	};
	xmlhttp.open("POST", "CreateNewChat.php?q=" + UserName, true);
	xmlhttp.send();
}

function ShowProfile() {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			PH.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("POST", "ShowProfile.php?q=" + 0, true);
	xmlhttp.send();
}
