let container = document.getElementById("container");

let ba = [];
ba = document.getElementsByClassName("ba");

let buttons = [];

let cfnmc;
let cfnmg;

let running = false;
let last_known = 5;

/*
Object.values(document.getElementsByClassName("prev")).forEach(e => {
	e.addEventListener("mouseover", () => {
		e.style.backgroundColor = "red";
	});
})*/
document.body.onload = async function() {
	//just bring user data. no need to load account module
	//await account.handle_click_menu();
	//no need to load chats since calls will bring all info it needs with it
	//await chats.handle_click_menu();
	// doesnt make sense that calls is using chats data. it should bring data from server itself
	//await calls.handle_click_menu(); //wait for getting local video stream

	/*
	await calls.load();
	calls.is_open = 1;
	calls.loaded = 1;
	Content.current = calls;
	calls.element.style.display = "grid";
	calls.menu.style.backgroundColor = 'var(--menu-selected-bg)';
	*/
	console.log(window.location);
	/*
	if (resources) {
		//setInterval(check_for_new_chats, 10000);
		//setInterval(check_for_new_groups, 10000);

		//cfnmc = setInterval(check_for_new_media_chats, 10000);
		//cfnmg = setInterval(check_for_new_media_groups, 10000);
	}

	Notification.requestPermission().then((result) => {
		console.log(result);
	});

	console.log(window.location);
	*/
}
/*
Object.entries(result).forEach(([id, row]) => {
//for(const row in result) {
	//const { id, text, src } = this.interprete_result_of_load_data(result[i]);

	let path = "data/icons/";
	let text = `${id} , `;
	path += "users/";
	text += `${row.user_id} , ${row.user_name} , ${row.first_name} , ${row.last_name}`;
*/
/*
	let testArray = ["Shirt", "Bottom", "Shoes"];
	window.sessionStorage.setItem("items", JSON.stringify(testArray));
	var storedArray = JSON.parse(sessionStorage.getItem("items"));//no brackets
	var i;
	for (i = 0; i < storedArray.length; i++) {
		alert(storedArray[i]);
	}
*/
function check_for_new_chats() {
	chats.check_for_new();
}
function check_for_new_groups() {
	groups.check_for_new();
}
function check_for_new_media_chats() {
	chats.check_for_new_media();
}
function check_for_new_media_groups() {
	groups.check_for_new_media();
}

//document.body.addEventListener("load", load_home);
/*
function attach_javascript_files() {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let files = new Array();
			files = JSON.parse(this.responseText);

			for (let file in files) {
				let s = document.createElement("script");
				s.src = file;
				document.body.appendChild(s);
			}
			load_home();
		}
	};
	xhr.open("GET", "../php/directory_js.php", true);
	xhr.send();
}
*/
