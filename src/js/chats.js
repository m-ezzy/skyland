function load_chats(t) {
	if (chats.open) {
		return;
	}

	//if common and chats are already loaded before
	Menu.current.open = 0;
	Menu.current.element.style.visibility = "hidden";

	Menu.current = chats;
	chats.open = 1;
	chats.element.style.visibility = "visible";

	console.log("100" + chats);

	if (chats.loaded_already) {
		return;
	}
	if (common_loaded) {
		//TS.removeEventListener("keyup", search_groups);
		//BS.removeEventListener("click", search_groups);

		load_chats_from_server();
		return;
	}

	console.log("101");
	chats.element.innerHTML = load_common("");

	chats.initialize();

	load_chats_from_server();

	console.log("502");

	//do_amazing_animation("0vw", "5vh", "10vw", "5vh");
	do_amazing_animation_this(t);
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

				c += "<div onclick='show_conversation(this," + s.user_name + ")'>";
				c += "<img src='" + path + "'>";
				c += s.user_name + " " + s.first_name + " " + s.last_name;
				c += "</div>";

				chats.previous.push({user_name: (s.user_name), first_name: (s.first_name), last_name: (s.last_name), extension: (s.extension), rows: 0});
				i++;
			}
			chats.cl.innerHTML = c;

			chats.sr.innerHTML = "";

			let e;
			e = create_input_text("text key", "", "enter key of this conversation", "0");
			chats.element.appendChild(e);

			e = create_div("button key", "", "e_d", "encrypt/decrypt");
			chats.element.appendChild(e);

			chats.tk = chats.element.getElementsByClassName("text key")[0];
			chats.bk = chats.element.getElementsByClassName("button key")[0];

			show_conversation(chats.cl.firstElementChild, r[0].user_name);
			//CL.firstElementChild.click();
			//CL.firstElementChild.click(this, r[0].user_name);

			/*
			if (resources) {
				TS.addEventListener("input", search_user);
			}*/
		}
	};
	//xhr.setRequestHeader("Access-Control-Allow-Origin": "*");
	xhr.open("POST", "../php/chats/load_chats.php", true);
	xhr.send();
}
function search_user() {
	let s = chats.ts.value;
	if(s == "") {
		console.log(s + "23");
		return;
	}
	console.log(s);

	chats.sr.innerHTML = "";
	chats.sr.style.visibility = "visible";

	let pre = [];
	for (let i=0 ; i<chats.previous.length ; i++) {
		let un = chats.previous[i].user_name.search(s);
		let fn = chats.previous[i].first_name.search(s);
		let ln = chats.previous[i].last_name.search(s);

		console.log(un + fn + ln);

		if (un != -1 || fn != -1 || ln != -1) {
			pre.push(chats.previous[i]);
		}
	}
	if (pre.length) {
		//add banner showing already created chats
		chats.sr.appendChild(create_div("chat", "", "", "your previous chats"));
	}
	for (let i = 0 ; i < pre.length ; i++) {
		let img = document.createElement("img");
		img.src = pre[i].extension ? "../../data/profile_pictures/" + pre[i].user_name + "." + pre[i].extension : "../../media/images/place_holder3.png";

		let oc = "take_to_that_chat(this," + pre[i].user_name + ")";
		let text = pre[i].user_name + " " + pre[i].first_name + " " + pre[i].last_name;
		let temp = create_div("chat", "", oc, text);

		temp.appendChild(img);
		chats.sr.appendChild(temp);
	}

	console.log("503");
	console.log(s);

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
				chats.sr.appendChild(create_div("chat", "", "", "start a new chat"));
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
				chats.sr.appendChild(temp);
			}
			if (pre.length == 0 && r.length == 0) {
				//SR.innerHTML = "<div class='chat'> no such user found </div>";
				chats.sr.appendChild(create_div("chat", "", "", "no such user found"));
			}
		}
	};
	xhr.open("GET", "../php/chats/search_user.php?q=" + s, true);
	xhr.send();
}
function take_to_that_chat(t, user_name) {
	chats.sr.style.visibility = "hidden";

	show_conversation(t, user_name);
}
function create_new_chat(user_name, first_name, last_name, extension) {
	chats.sr.style.visibility = "hidden";

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let img = document.createElement("img");
			img.src = extension != "null" ? "../../data/profile_pictures/" + user_name + "." + extension : "../../media/images/place_holder3.png";

			let oc = "show_conversation(this, " + user_name + ")";
			let text = user_name + " " + first_name + " " + last_name;
			let temp = create_div("chat", "", oc, text);

			temp.appendChild(img);
			chats.cl.appendChild(temp);

			show_conversation(chats.cl.lastElementChild, user_name);
		}
	};
	xhr.open("POST", "../php/chats/create_new_chat.php?q=" + user_name, true);
	xhr.send();
}

//can't use 'this' in function parameters, using 't' instead of 'this'
function show_conversation(t, user_name) {
	let key = chats.tk.value;
	if(isNaN(key)) {
		return;
	}

	chats.current = chats.previous.user_name.indexOf(user_name);
	chats.ch.innerHTML = t.innerHTML;
	chats.ml.innerHTML = "";

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

				let e;

				let class_media = o.sent_by == me.user_name ? "sent" : "received";

				let w = Math.floor(innerWidth/5);
				let h = Math.floor(innerHeight/5);

				let first = me.user_name < chats.current ? me.user_name : chats.current;
				let second = me.user_name > chats.current ? me.user_name : chats.current;
				
				if(o.message) {
					let m = decryption(o.message, chats.tk.value);
					console.log(m);
					
					e = create_div(class_media + " messages", "", "", m);
				} else if(o.images) {
					e = create_image(class_media, "", "", "../../data/chats/chat_between_" + first + "_" + second + "/" + o.ROWNUM + "." + o.images, w, h);
				} else if(o.videos) {
					e = create_video(class_media, "", "", "../../data/chats/chat_between_" + first + "_" + second + "/" + o.ROWNUM + "." + o.videos, w, h);
				}
				chats.ml.appendChild(e);
				i++;
			}
			//let mlh = chats.ml.style.height;
			chats.ml.scrollTo(0,99999);

			//MS = document.getElementsByClassName("sent messages");
			//MR = document.getElementsByClassName("received messages");

			if(resources) {
				let ci = setInterval(check_for_new_messages, 1000);
			}
		}
	};
	xhr.open("POST", "../php/chats/show_conversation.php?q=" + user_name, true);
	xhr.send();
}

function select_images() {
	//document.getElementById("select_images").click();
	chats.element.getElementsByClassName("select_images")[0].click();
	document.getElementsByClassName("sending")[0].style.visibility = "visible";
}
function select_videos() {
	//document.getElementById("select_videos").click();
	chats.element.getElementsByClassName("select_videos")[0].click();
	document.getElementsByClassName("sending")[1].style.visibility = "visible";
}
function select_audios() {
	//document.getElementById("select_audios").click();
	chats.element.getElementsByClassName("select_audios")[0].click();
	document.getElementsByClassName("sending")[2].style.visibility = "visible";
}
function select_documents() {
	//document.getElementById("select_documents").click();
	chats.element.getElementsByClassName("select_documents")[0].click();
	document.getElementsByClassName("sending")[3].style.visibility = "visible";
}
function select_location() {
	//document.getElementById("select_location").click();
	chats.element.getElementsByClassName("select_location")[0].click();
	document.getElementsByClassName("sending")[4].style.visibility = "visible";
}

function send_message() {
	//console.log(40);

	if(chats.tm.value == "" || chats.tk.value == "") {
		return;
	}

	do_amazing_animation_z("55vw", "0vh", 7, "5vw", "10vh");

	let EM = encryption(chats.tm.value, chats.tk.value);
	//console.log(chats.tm.value + " " + chats.tk.value);

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(41);
			chats.ml.appendChild(create_div("sent messages", "", "", chats.tm.value));
			chats.ml.scrollBy(0,100);
		}
	};
	xhr.open("POST", "../php/chats/send_new_message.php?q=" + EM, true);
	xhr.send();
}
function send_images() {
	document.getElementsByClassName("sending")[0].style.visibility = "hidden";

	let xhr = new XMLHttpRequest();

	let file = chats.element.getElementsByClassName("select_images")[0].files[0];
	
	let fd = new FormData();
	fd.append("select_images", file);

	xhr.open("POST", "../php/chats/send_new_images.php", true);
	//xhr.setRequestHeader("Content-type","image");
	xhr.send(fd);

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			let w = Math.floor(innerWidth/5);
			let h = Math.floor(innerHeight/5);
			chats.ml.appendChild(create_image("sent", "", "", "../../data/chats/chat_between_" + this.responseText, w, h));
		}
	};
}
function send_videos() {
	document.getElementsByClassName("sending")[1].style.visibility = "hidden";

	let xhr = new XMLHttpRequest();
	//let file = document.getElementById('select_videos').files[0];
	let file = chats.element.getElementsByClassName("select_videos")[0].files[0];

	let fd = new FormData();
	fd.append("select_videos", file);

	xhr.open("POST", "../php/chats/send_new_videos.php", true);
	//xhr.setRequestHeader("Content-type","image");
	xhr.send(fd);

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			let w = Math.floor(innerWidth/5);
			let h = Math.floor(innerHeight/5);
			chats.ml.appendChild(create_video("sent", "", "", "../../data/chats/chat_between_" + this.responseText, w, h));
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
	if(chats.tk.value == "") {
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

				let w = Math.floor(innerWidth/5);
				let h = Math.floor(innerHeight/5);

				let first = me.user_name < chats.current ? me.user_name : chats.current;
				let second = me.user_name > chats.current ? me.user_name : chats.current;

				if (r.message) {
					let m = decryption(r);
					e = create_div("received messages", "", "", m);
				} else if (r.images) {
					e = create_image("received", "", "", "../../data/chats/chat_between_" + first + "_" + second + "/" + r.ROWNUM + "." + r.images, w, h);
				} else if (r.videos) {
					e = create_video("received", "", "", "../../data/chats/chat_between_" + first + "_" + second + "/" + r.ROWNUM + "." + r.videos, w, h);
				}
				chats.ml.appendChild(e);
			});
			chats.ml.scrollBy(0,500);
			/*chats.ml.scrollBottom();
			/*chats.ml.scrollTo(0,500);
			(last div tag in message list).scrollIntoView();*/
		}
	};
	xhr.open("POST", "../php/chats/check_for_new_messages.php", true);
	xhr.send();
}
function sm(e) {
	if(e.key == "Enter") {
		send_message();
	}
}
function add_enter_event() {
	document.addEventListener("keydown",sm);

	/*let chats.tm = document.getElementById("TextNewMessage");
	chats.tm.addEventListener("keydown",send_new_message);*/
}
function remove_enter_event() {
	document.removeEventListener("keydown",sm);

	/*let chats.tm = document.getElementById("TextNewMessage");
	chats.tm.removeEventListener("keydown",send_new_message);*/
}