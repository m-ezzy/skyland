
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

/*
let tp = [];
tp = document.getElementsByClassName("tp");*/

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


document.body.onload = function() {
	load_chats();
}

let content = document.getElementById("content");
let home = "";
let chats = "";
let groups = "";
let channels = "";


//export {tp};
