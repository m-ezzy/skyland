function load_skeleton() {
	console.log("5");
	
	let c = document.getElementById("container");
	c.innerHTML = "";

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			c.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("POST", "load_skeleton.php", true);
	xmlhttp.send();
}
let menu_home = "";
let menu_chat = "";
let menu_groups = "";

function load_home() {
	let c = document.getElementById("content");

	if(menu_home == "") {
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				c.innerHTML = this.responseText;
				menu_home = this.responseText;
			}
		};
		xmlhttp.open("POST", "load_home.php", true);
		xmlhttp.send();
	} else {
		c.innerHTML = menu_home;
	}
}
