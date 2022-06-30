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

let A;
*/

let container = document.getElementById("container");

let ba = [];
ba = document.getElementsByClassName("ba");

let MB = document.getElementById("menu_bar");
let BT = document.getElementById("theme");
let C = document.getElementById("content");

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

let theme_colors = [
	["rgb(25, 25, 25)", "rgb(90, 90, 90)", "rgb(200, 200, 35)", "rgb(40, 90, 50)","rgb(255, 255, 255)"],
	["rgb(100, 100, 100)", "rgb(255, 255, 255)", "rgb(255, 255, 60)", "rgb(30, 200, 60)","rgb(0, 0, 0)"],
];

let theme_names = ["apple","cherry","grapes","mango","orange","pineapple","pumpkin","strawberry","watermelon"];


document.body.onload = function() {
	load_chats();
}

let home = "";
let chats = "";
let groups = "";
let channels = "";

function toggle_theme(t) {
	/*t.style.backgroundColor = 'rgb(255, 255, 255, 0)';*/

	do_amazing_animation("0vw", "95vh", "10vw");
	//do_amazing_animation_id('button_theme');

	/*
	if(t.style.backgroundColor = "blue") {
		t.style.backgroundColor = "red";
	} else {
		t.style.backgroundColor = "blue";
	}*/

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
