let bli = document.getElementById("button_log_in");
bli.addEventListener("click", button_log_in)

let b_s_u = document.getElementById("button_sign_up");
b_s_u.addEventListener("click",button_sign_up_clicked);

function button_log_in() {
	let liun = document.getElementById("log_in_user_name");
	let lipw = document.getElementById("log_in_pass_word");

	console.log("er");

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			let num = parseInt(this.responseText);

			if(num == 2) {
				console.log("4");
				load_skeleton();
			}
		}
	};
	xmlhttp.open("POST","log_in.php?u=" + liun + "&p=" + lipw,true);
	//xmlhttp.setRequestHeader("Content-type", "log_in.php");
	//xmlhttp.open("POST", "log_in.php", true);
	//xmlhttp.send("u=" + liun + "&p=" + lipw);
	xmlhttp.send();
}
function button_sign_up_clicked() {
	let s_u_u_n = document.getElementById("sign_up_user_name");
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
	xmlhttp.open("POST", "sign_up.php?u=" + s_u_u_n + "p=" + s_u_p_w + "fn=" + f_n + "ln=" + l_n, true);
	xmlhttp.send();
}
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



