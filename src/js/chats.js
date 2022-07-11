function load_chats() {
	if (chats.open) {
		return;
	} else if(chats.loaded_already) {
		//if common and chats are already loaded before
		Menu.current.open = 0;
		Menu.current.element.style.visibility = "hidden";

		Menu.current = chats;
		chats.open = 1;
		chats.element.style.visibility = "visible";

		console.log("100" + chats);
	} else if(common_loaded) {
		//TS.removeEventListener("keyup", search_groups);
		//BS.removeEventListener("click", search_groups);

		load_chats_from_server();
	} else {
		console.log("101");
		load_common(chats);



		BB = document.getElementById("button_back");
		TS = document.getElementById("text_search");
		BS = document.getElementById("button_search");

		SR = document.getElementById("search_results");
		CL = document.getElementById("chat_list");

		CH = document.getElementById("current_header");

		ML = document.getElementById("messages_list");

		SNM = document.getElementById("send_new_media");

		TNM = document.getElementById("text_new_message");
		BNM = document.getElementById("button_new_message");

		buttons = document.getElementsByClassName("button");



		load_chats_from_server();
		console.log("502");
	}

	do_amazing_animation("0vw", "5vh", "10vw", "5vh");
}
function load_chats_from_server() {
	//retrieve info for first time and put it in respective places
	chats.loaded_already = 1;

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let c = "";

			let r = new Array();
			r = JSON.parse(this.responseText);

			let i = 0;
			while(s = r[i]) {
				let path = s.extension ? "../../data/profile_pictures/" + s.user_name + "." + s.extension : "../../media/images/place_holder3.png";

				c += "<div onclick='show_messages(this," + s.user_name + ")'>";
				c += "<img src='" + path + "'>";
				c += s.user_name + " " + s.first_name + " " + s.last_name;
				c += "</div>";

				chats.previous.push({user_name: s.user_name, first_name: s.first_name, last_name: s.last_name, extension: s.extension});
				i++;
			}
			CL.innerHTML = c;
			//content.chats.CL = c;

			SR.innerHTML = "";
			//content.chats.SR = "";

			/*
			c = "<input type='text' placeholder='enter key of this conversation' id='text_key' value='0' />";
			c += "<div class='button' id='button_e_d' onclick='e_d()'> encrypt / decrypt </div>";
			CH.innerHTML += c;
			//content.chats.CH = c;
			*/

			let e;
			e = create_input_text("enter key of this conversation", "text_key", "0");
			chats.element.appendChild(e);

			e = create_element_all("div", "button", "button_e_d", "e_d", "encrypt/decrypt");
			chats.element.appendChild(e);

			TK = document.getElementById("text_key");

			show_messages(CL.firstElementChild, r[0].user_name);
			//CL.firstElementChild.click();
			//CL.firstElementChild.click(this, r[0].user_name);

			//content.chats.CH = CH.innerHTML;

			//content.chats.ML = ML.innerHTML;

			//TS.addEventListener("keyup", search_user);
			//BS.addEventListener("click", search_user);

			//current.chat.name = r[0].user_name;

			//TS.addEventListener("keyup", search_user);
			//BS.addEventListener("click",search_user);
		}
	};
	//xhr.setRequestHeader("Access-Control-Allow-Origin": "*");
	xhr.open("POST", "../php/chats/load_chats.php", true);
	xhr.send();
}
function search_user() {
	let TS_value = document.getElementById("text_search").value;
	if(TS_value == "") {
		console.log(TS_value + "23");
		return;
	}
	console.log(TS_value);

	SR.innerHTML = "";
	SR.style.visibility = "visible";

	let pre = [];
	for (let i=0 ; i<chats.previous.length ; i++) {
		let un = chats.previous[i].user_name.search(TS_value);
		let fn = chats.previous[i].first_name.search(TS_value);
		let ln = chats.previous[i].last_name.search(TS_value);

		if (un != -1 || fn != -1 || ln != -1) {
			pre.push(chats.previous[i]);
		}
	}
	if (pre.length) {
		//add banner showing already created chats
		SR.appendChild(create_div("chat", "", "", "your previous chats"));
	}
	for (let i = 0 ; i < pre.length ; i++) {
		let img = document.createElement("img");
		img.src = pre[i].extension ? "../../data/profile_pictures/" + pre[i].user_name + "." + pre[i].extension : "../../media/images/place_holder3.png";

		let oc = "take_to_that_chat(this," + pre[i].user_name + ")";
		let text = pre[i].user_name + " " + pre[i].first_name + " " + pre[i].last_name;
		let temp = create_div("chat", "", oc, text);

		temp.appendChild(img);
		SR.appendChild(temp);
	}

	console.log("503");
	console.log(TS.value);

	do_amazing_animation("25vw", "0vh", "5vw", "10vh");

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let r = new Array();
			r = JSON.parse(this.responseText);

			console.log(this.responseText);
			console.log(r);

			if (r.length) {
				//add banner showing chats with whom no previous communication
				SR.appendChild(create_div("chat", "", "", "start a new chat"));
			}
			for (let i = 0 ; i < r.length ; i++) {
				let img = document.createElement("img");
				img.src = r[i].extension ? "../../data/profile_pictures/" + r[i].user_name + "." + r[i].extension : "../../media/images/place_holder3.png";

				let oc = "create_new_chat(" + r[i].user_name + ",'" + r[i].first_name + "','" + r[i].last_name + "','" + r[i].extension + "')";
				let text = r[i].user_name + " " + r[i].first_name + " " + r[i].last_name;
				let temp = create_div("chat", "", oc, text);
				//temp.onclick = oc;

				console.log(temp);

				temp.appendChild(img);
				SR.appendChild(temp);
			}
			if (pre.length == 0 && r.length == 0) {
				//SR.innerHTML = "<div class='chat'> no such user found </div>";
				SR.appendChild(create_div("chat", "", "", "no such user found"));
			}
		}
	};
	xhr.open("GET", "../php/chats/search_user.php?q=" + TS_value, true);
	xhr.send();
}
function take_to_that_chat(t,user_name) {
	SR.style.visibility = "hidden";

	show_messages(t,user_name);
}
function create_new_chat(user_name, first_name, last_name, extension) {
	SR.style.visibility = "hidden";

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let img = document.createElement("img");
			img.src = extension ? "../../data/profile_pictures/" + user_name + "." + extension : "../../media/images/place_holder3.png";

			let oc = "show_messages(this, " + user_name + ")";
			let text = user_name + " " + first_name + " " + last_name;
			let temp = create_div("chat", "", oc, text);

			temp.appendChild(img);
			SR.appendChild(temp);

			//show_messages(temp, user_name);
		}
	};
	xhr.open("POST", "../php/chats/create_new_chat.php?q=" + user_name, true);
	xhr.send();
}

//can't use 'this' in function parameters, using 't' instead of 'this'
function show_messages(t, user_name) {
	let key = parseInt(document.getElementById("text_key").value);
	if(isNaN(key)) {
		return;
	}

	chats.current = user_name;
	CH.innerHTML = t.innerHTML;
	ML.innerHTML = "";

	//do_amazing_animation('id',t.style.left, t.style.top, t.style.width);
	do_amazing_animation("10vw", "10vh", "30vw", "10vh");

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			let result = Array();
			result = JSON.parse(this.responseText);
			
			let i = 0;
			while(o = result[i]) {
				console.log(o);
				if(o.message) {
					let m = decryption(o.message);
					console.log(m);

					let who;
					if(o.sent_by == user_name) {
						who = "messages_received";
					} else {
						who = "messages_sent";
					}
					ML.appendChild(create_div(who, "", "", m));
				} else if(o.images) {
					let class_image = o.sent_by == me.user_name ? "sent image" : "received image";

					let first = me.user_name < chats.current ? me.user_name : chats.current;
					let second = me.user_name > chats.current ? me.user_name : chats.current;

					ML.appendChild(create_image(class_image, "", "", "../../data/chats/chat_between_" + first + "_" + second + "/" + o.ROWNUM + "." + o.images));
				}
				i++;
			}
			//let mlh = ML.style.height;
			ML.scrollTo(0,99999);

			MS = document.getElementsByClassName("messages_sent");
			MR = document.getElementsByClassName("messages_received");

			if(resources) {
				let ci = setInterval(check_for_new_messages, 1000);
			}
		}
	};
	xhr.open("POST", "../php/chats/show_messages.php?q=" + user_name, true);
	xhr.send();
}
function send_new_message() {
	//console.log(40);

	if(TNM.value == "" || TK.value == "") {
		return;
	}

	do_amazing_animation_z("55vw", "0vh", 7, "5vw", "10vh");

	let EM = encryption(TNM.value);
	//console.log(TNM.value + " " + TK.value);

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(41);
			ML.appendChild(create_div("messages_sent", "", "", TNM.value));
			ML.scrollBy(0,100);
		}
	};
	xhr.open("POST", "../php/chats/send_new_message.php?q=" + EM, true);
	xhr.send();
}

function select_images() {
	document.getElementById("select_images").click();
	document.getElementsByClassName("sending")[0].style.visibility = "visible";
}
function select_videos() {
	document.getElementById("select_videos").click();
	document.getElementsByClassName("sending")[1].style.visibility = "visible";
}
function select_audios() {
	document.getElementById("select_audios").click();
}
function select_documents() {
	document.getElementById("select_documents").click();
}
function select_location() {
	document.getElementById("select_location").click();
}

function send_images() {
	let xhr = new XMLHttpRequest();

	let file = document.getElementById('select_images').files[0];
	
	let fd = new FormData();
	fd.append("select_images", file);

	xhr.open("POST", "../php/chats/send_new_images.php", true);
	//xhr.setRequestHeader("Content-type","image");
	xhr.send(fd);

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200) {
			document.getElementsByClassName("sending")[0].style.visibility = "hidden";
			ML.innerHTML += "<img src='../../data/chats/chat_between_" + this.responseText + "'>";
		}
	};
}

function close_images() {
	document.getElementsByClassName("sending")[0].style.visibility = "hidden";
}
function close_videos() {
	document.getElementsByClassName("sending")[1].style.visibility = "hidden";
}
function close_audios() {
	document.getElementsByClassName("sending")[2].style.visibility = "hidden";
}
function close_documents() {
	document.getElementsByClassName("sending")[3].style.visibility = "hidden";
}
function close_location() {
	document.getElementsByClassName("sending")[4].style.visibility = "hidden";
}

function check_for_new_messages() {
	if(TK.value == "") {
		return;
	}
	//let RN = <?php echo $_SESSION['RowNumber']?>;

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "") {
				return;
			}

			let result = new Array(JSON.parse(this.responseText));
			result.forEach(r => {
				let e;

				if (r.message) {
					let m = decryption(r);
					e = create_div_class_text("messages_received", m);
				} else if (r.images) {
					let first = me.user_name < chats.current ? me.user_name : chats.current;
					let second = me.user_name > chats.current ? me.user_name : chats.current;

					e = create_image("received image", "", "", "../../data/chats/chat_between_" + first + "_" + second + "/" + r.ROWNUM + "." + r.images);
				}
				ML.appendChild(e);
			});

			ML.scrollBy(0,500);
			/*ML.scrollBottom();
			/*ML.scrollTo(0,500);
			(last div tag in message list).scrollIntoView();*/
		}
	};
	xhr.open("POST", "../php/chats/check_for_new_messages.php", true);
	xhr.send();
}
function snm(e) {
	if(e.key == "Enter") {
		send_new_message();
	}
}
function add_enter_event() {
	document.addEventListener("keydown",snm);

	/*let TNM = document.getElementById("TextNewMessage");
	TNM.addEventListener("keydown",send_new_message);*/
}
function remove_enter_event() {
	document.removeEventListener("keydown",snm);

	/*let TNM = document.getElementById("TextNewMessage");
	TNM.removeEventListener("keydown",send_new_message);*/
}