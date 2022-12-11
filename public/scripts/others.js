class Element { //Node
	constructor(type, x, y, w, h, color) {
		this.element = document.createElement(type);

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

function create_element_all(type, class_name, id, oc, text) {
	let e = document.createElement(type);
	e.className = class_name;
	e.id = id;
	e.onclick = oc;
	e.appendChild(document.createTextNode(text));
	return e;
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
function create_div(class_name, id, oc, text) {
	let e = document.createElement("div");
	e.className = class_name;
	e.id = id;
	e.setAttribute("onclick", oc);
	e.appendChild(document.createTextNode(text));
	return e;
}
function create_div_class_text(class_name, text) {
	let e = document.createElement("div");
	e.className = class_name;
	e.appendChild(document.createTextNode(text));
	return e;
}
function create_image(class_name, id, oc, src, w, h) {
	let e = document.createElement("img");
	e.className = class_name;
	e.id = id;
	e.setAttribute("onclick", oc);
	e.src = src;
	e.setAttribute("width", w);
	e.setAttribute("height", h);
	return e;
}
function create_video(class_name, id, oc, src, w, h) {
	let e = document.createElement("video");
	e.className = class_name;
	e.id = id;
	e.setAttribute("onclick", oc);
	e.src = src;
	e.setAttribute("width", w);
	e.setAttribute("height", h);

	e.controls = true;
	e.muted = false;
	return e;
}
function create_input_text(class_name, id, ph, value) {
	let e = document.createElement("input");
	e.type = "text";
	e.className = class_name;
	e.id = id;
	e.placeholder = ph;
	e.value = value;
	return e;
}

//3
/*
class Theme {
	constructor(a) {
		this.bg = a[0];
		this.text = a[1];

		this.bm_bg = a[0];
		//this.bm_text = a[1];
		this.bl_bg = a[2];
		//this.bl_text = a[3];
		this.bc_bg = a[4];
		//this.bc_text = a[5];

		this.item_hover_bg = a[6];
		this.item_hover_text = a[7];
		this.item_selected_bg = a[8];
		this.item_selected_text = a[9];

		this.text_box_bg = a[9];   //input_text_bg
		this.text_box_text = a[9];

		this.border = a[9];
	}
	static current = 0;
	static changeTheme() {
		let r = document.querySelector(':root');
		r.style.setProperty('--bm-bg', themes[this.current].bm_bg);
		r.style.setProperty('--bm-text', themes[this.current].bm_text);
	}
}
let themes = [];
themes.push(new Theme(['#ADEFD1FF', '#00203FFF']));
themes.push(new Theme(['#184A45FF', '#b2d8d8']));
*/
/*
//1
let theme_colors = [
	["#FFAEF7", "#AAFFA2", "rgb(180, 180, 180)", "#FF8B8B", "#F5FFA2", "#ffa860"],
	["rgb(25, 25, 25)", "rgb(90, 90, 90)", "rgb(200, 200, 35)", "rgb(40, 90, 50)","rgb(255, 255, 255)","rgb(25, 25, 25)"],
	["rgb(100, 100, 100)", "rgb(255, 255, 255)", "rgb(255, 255, 60)", "rgb(30, 200, 60)","rgb(0, 0, 0)","rgb(25, 25, 25)"],
	["rgb(10, 100, 100)", "rgb(255, 255, 25)", "rgb(255, 255, 100)", "rgb(250, 20, 60)","rgb(0, 90, 10)","rgb(250, 25, 15)"],
	["rgb(30, 100, 200)", "rgb(255, 255, 255)", "rgb(255, 255, 200)", "rgb(30, 200, 60)","rgb(100, 50, 0)","rgb(5, 25, 85)"],
];
let theme_names = ["apple","cherry","grapes","mango","orange","pineapple","pumpkin","strawberry","watermelon"];

function toggle_theme(t) {
	do_amazing_animation("0vw", "95vh", "10vw", "5vh");
	//do_amazing_animation_id('button_theme');

	if (theme.current == theme.colors.bg.length - 1) {
		theme.current = 0;
	} else {
		theme.current++;
	}

	let r = document.querySelector(':root');
	r.style.setProperty('--bg', theme.colors.bg[theme.current]);
	r.style.setProperty('--text', theme.colors.text[theme.current]);
}
*/

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
function do_amazing_animation_this(t) {
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
