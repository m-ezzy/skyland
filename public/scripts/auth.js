//let bli = document.getElementById("button_log_in");
//let bsu = document.getElementById("button_sign_up");

async function log_in() {
	let un = document.getElementById("log_in_user_name").value;
	let pw = document.getElementById("log_in_pass_word").value;

	console.log("er");

	let response = await fetch("/log_in", {method: 'POST', mode: 'cors', body: 'user_name=' + un + '&pass_word=' + pw});
	let result = await response.json();
}
function sign_up() {
	let suun = document.getElementById("sign_up_user_name");
	let s_u_p_w = document.getElementById("sign_up_pass_word");
	let f_n = document.getElementById("sign_up_first_name");
	let l_n = document.getElementById("sign_up_last_name");

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let num = parseInt(this.responseText);

			if(num == 2) {
				load_skeleton();
			}
		}
	};
	xmlhttp.open("POST", "sign_up.php?u=" + suun + "p=" + s_u_p_w + "fn=" + f_n + "ln=" + l_n, true);
	xmlhttp.send();
}

/*
let ev;
if(resources) {
	ev = "input";
} else {
	ev = "change";
}
let suun = document.getElementById("suun");
suun.addEventListener(ev, user_name_available);
*/

async function check_user_name(user_name, num) {
	if (user_name == "") {
		return;
	}

	let response = await fetch(backEnd.pre + 'account/user_name_available' + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_name=' + user_name});
	let data = await response.json();
	console.log(data);

	let colors = ['green', 'red', 'green'];

	let vr = document.getElementsByClassName('validate')[num];
	vr.style.visibility = 'visible';

	if (data.answer) {
		vr.style.backgroundColor = colors[num/2 + 1];
		vr.innerHTML = "user name is not registered !";
	} else {
		vr.style.backgroundColor = colors[num/2];
		vr.innerHTML = "user name is registered !";
	}
}
