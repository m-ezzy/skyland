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

function create_div_tag(class_name, id, text) {
	let element = document.createElement("div");
	element.className = class_name;
	element.id = id;

	let text_node = document.createTextNode(text);
	element.appendChild(text_node);

	return element;
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
