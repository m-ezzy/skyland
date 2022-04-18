let bli = document.getElementById("button_log_in");
let bsu = document.getElementById("button_sign_up");

bli.addEventListener("click", button_log_in)
bsu.addEventListener("click",button_sign_up);

function button_log_in() {
	let li = document.getElementById("log_in");
	let liun = document.getElementById("log_in_user_name");
	let lipw = document.getElementById("log_in_pass_word");

	console.log("er");

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			let num = parseInt(this.responseText);

			if(num == NaN) {
				li = this.responseText;
				console.log("4");
				
				//load_skeleton();
				//load_home();
			} else {
				window.location.href = "index.php";
			}
		}
	};
	xmlhttp.open("POST", "log_in.php?u=" + liun.value + "&p=" + lipw.value, true);
	//xmlhttp.setRequestHeader("Content-type", "log_in.php");
	//xmlhttp.open("POST", "log_in.php", true);
	//xmlhttp.send("u=" + liun + "&p=" + lipw);
	xmlhttp.send();
}
function button_sign_up() {
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



