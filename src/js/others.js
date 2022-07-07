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

function create_element(type, class_name, id, text) {
	let e = document.createElement(type);
	e.className = class_name;
	e.id = id;
	let t = document.createTextNode(text);
	e.appendChild(t);

	return e;
}
function create_element_div(class_name, id, text) {
	let e = document.createElement("div");
	e.className = class_name;
	e.id = id;

	let text_node = document.createTextNode(text);
	e.appendChild(text_node);

	return e;
}


let theme_current = 1;

let theme_colors = [
	["rgb(25, 25, 25)", "rgb(90, 90, 90)", "rgb(200, 200, 35)", "rgb(40, 90, 50)","rgb(255, 255, 255)","rgb(25, 25, 25)"],
	["rgb(100, 100, 100)", "rgb(255, 255, 255)", "rgb(255, 255, 60)", "rgb(30, 200, 60)","rgb(0, 0, 0)","rgb(25, 25, 25)"],
	["rgb(10, 100, 100)", "rgb(255, 255, 25)", "rgb(255, 255, 100)", "rgb(250, 20, 60)","rgb(0, 90, 10)","rgb(250, 25, 15)"],
	["rgb(30, 100, 200)", "rgb(255, 255, 255)", "rgb(255, 255, 200)", "rgb(30, 200, 60)","rgb(100, 50, 0)","rgb(5, 25, 85)"],
];

let theme_names = ["apple","cherry","grapes","mango","orange","pineapple","pumpkin","strawberry","watermelon"];


function toggle_theme(t) {
	/*t.style.backgroundColor = 'rgb(255, 255, 255, 0)';*/

	do_amazing_animation("0vw", "95vh", "10vw", "5vh");
	//do_amazing_animation_id('button_theme');

	if(theme_current == theme_colors.length - 1) {
		theme_current = 0;
	} else {
		theme_current++;
	}

	MB.style.backgroundColor = theme_colors[theme_current][0];
	CL.style.backgroundColor = theme_colors[theme_current][1];
	SR.style.backgroundColor = theme_colors[theme_current][2];
	CH.style.backgroundColor = theme_colors[theme_current][3];
	ML.style.backgroundColor = theme_colors[theme_current][4];
	SNM.style.backgroundColor = theme_colors[theme_current][5];

	/*
	MB.style.backgroundImage = "url(../media/images/skins/" + theme_names[theme] + "/menu_bar.jpg)";
	CL.style.backgroundImage = "url(../media/images/skins/" + theme_names[theme] + "/chat_list.jpg)";
	ML.style.backgroundImage = "url(../media/images/skins/" + theme_names[theme] + "/messages_list.jpg)";
	*/

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
function do_amazing_animation(left, top, width, height) {
	/*t.style.backgroundColor = 'rgb(255, 255, 255, 0)';*/

	for(let i = 0 ; i < 5 ; i++) {
		/*ba[i].style.left = t.style.left;
		ba[i].style.top = t.style.top;*/

		ba[i].style.left = left;
		ba[i].style.top = top;
		ba[i].style.width = width;
		ba[i].style.height = height;
	}

	setTimeout(reset_width, 1000);
}
function do_amazing_animation_z(left, top, z, width, height) {
	/*t.style.backgroundColor = 'rgb(255, 255, 255, 0)';*/

	for(let i = 0 ; i < 5 ; i++) {
		/*ba[i].style.left = t.style.left;
		ba[i].style.top = t.style.top;*/

		ba[i].style.left = left;
		ba[i].style.top = top;
		ba[i].style.zIndex = (z - 0.5) + " ";
		ba[i].style.width = width;
		ba[i].style.height = height;
	}

	setTimeout(reset_width, 1000);
}
function do_amazing_animation_id(id) {
	let t = document.getElementById(id);
	console.log(t);
	console.log("100");
	console.log(t.style.top);

	
	for(let i = 0 ; i < 5 ; i++) {
		ba[i].style.left = t.style.left;
		ba[i].style.top = t.style.top;
		ba[i].style.width = t.style.width;
		ba[i].style.height = t.style.height;
	}
	setTimeout(reset_width, 1000);
}
function reset_width() {
	for(let i = 0 ; i < 5 ; i++) {
		ba[i].style.width = "0vw";
	}
}

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
/*
$(document).ready(function() {
	$("#button_theme").click(function() {
		$(".MessagesSent").style.backgroundColor = "green";
	});
});
*/
