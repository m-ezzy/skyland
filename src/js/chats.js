function load_chats() {
	current.chat.open = 1;
	current.group.open = 0;

	console.log("100");

	current_menu.style.visibility = "hidden";
	current.menu = chats;
	chats.style.visibility = "visible";

	if(content.chats.loaded_already) {
		//if common and chats are already loaded before
	} else if(common_loaded) {
		//TS.removeEventListener("keyup", search_groups);
		//BS.removeEventListener("click", search_groups);

		load_chats_from_server();
	} else {
		console.log("501");
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
	content.chats.loaded_already = 1;

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

				i++;
			}
			CL.innerHTML = c;
			content.chats.CL = c;

			SR.innerHTML = "";
			content.chats.SR = "";

			c = "<input type='text' placeholder='enter key of this conversation' id='text_key' value='0'>";
			c += "<div class='button' id='button_e_d' onclick='e_d()'> encrypt / decrypt </div>";
			CH.innerHTML += c;
			content.chats.CH = c;

			TK = document.getElementById("text_key");

			//show_messages(CL.firstElementChild, r[0].user_name);
			//CL.firstElementChild.click();
			//CL.firstElementChild.click(this, r[0].user_name);

			content.chats.CH = CH.innerHTML;

			content.chats.ML = ML.innerHTML;

			//TS.addEventListener("keyup", search_user);
			//BS.addEventListener("click", search_user);

			//current.chat.name = r[0].user_name;

			//TS.addEventListener("keyup", search_user);
			//BS.addEventListener("click",search_user);
		}
	};
	//xmlhttp.setRequestHeader("Access-Control-Allow-Origin": "*");
	xhr.open("POST", "../php/chats/load_chats.php", true);
	xhr.send();
}
function search_user() {
	console.log("503");
	console.log(TS.value);

	let TS_value = document.getElementById("text_search").value;

	if(TS_value == "") {
		console.log(TS_value + "23");
		return;
	}
	console.log(TS_value);

	do_amazing_animation("25vw", "0vh", "5vw", "10vh");

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("search_results").style.visibility = "visible";
			console.log('102');
			document.getElementById("search_results").innerHTML = this.responseText;
		}
	};
	xmlhttp.open("GET", "../php/chats/search_user.php?q=" + TS_value, true);
	xmlhttp.send();
}
function take_to_that_chat(t,user_name) {
	//CL.innerHTML = CLinnerHTML;
	SR.style.visibility = "hidden";
	//SR.innerHTML = "";

	show_messages(t,user_name);
}
function create_new_chat(user_name) {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//SR.style.visibility = "hidden";
			//SR.innerHTML = "";
		
			//CL.innerHTML = CLinnerHTML;
			CL.innerHTML += this.responseText;
			content.chats.CL += this.responseText;

			SR.style.visibility = "hidden";
		
			show_messages(user_name);
		}
	};
	xmlhttp.open("POST", "../php/chats/create_new_chat.php?q=" + user_name, true);
	xmlhttp.send();
}

//can't use 'this' in function parameters, using 't' instead of 'this'
function show_messages(t, user_name) {
	current.chat.name = user_name;

	let key = parseInt(document.getElementById("text_key").value);

	if(isNaN(key)) {
		return;
	}

	//do_amazing_animation('id',t.style.left, t.style.top, t.style.width);
	do_amazing_animation("10vw", "10vh", "30vw", "10vh");

	CH.innerHTML = t.innerHTML;
	content.chats.CH = CH.innerHTML;

	//console.log(this);
	//let ML = document.getElementById("messages_list");
	ML.innerHTML = "";

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			current.chat.name = user_name;
			//ML.innerHTML = this.responseText;

			let result = Array();
			result = JSON.parse(this.responseText);
			
			let i = 0;
			while(o = result[i]) {
			//result.forEach(r => {
				//r.forEach(c => {
				if(o.message) {
					console.log(o);
					let m = decryption(o.message);
					console.log(m);


					let who;
					if(o.sent_by == user_name) {
						who = "messages_received";
					} else {
						who = "messages_sent";
					}

					/*
					let ne = CreateDivTag(who, m);
					ML.appendChild(ne);
					*/

					let NewElement = document.createElement("div");
					NewElement.className = who;
					//NewElement.id = id;

					let textNode = document.createTextNode(m);
					NewElement.appendChild(textNode);

					ML.appendChild(NewElement);

					//ML.innerHTML += "<div class='MessagesReceived'>" + m + "</div>";
					//});
				} else if(o.images) {
					let class_image = o.sent_by == me.user_name ? "sent image" : "received image";

					let first = me.user_name < current.chat ? me.user_name : current.chat;
					let second = me.user_name > current.chat ? me.user_name : current.chat;

					ML.innerHTML += "<img src='../../data/chats/chat_between_" + first + "_" + second + "/" + o.ROWNUM + "." + o.images + "' class='" + class_image + "'>";
				}
				i++;
			//});
			}

			content.chats.ML = ML.innerHTML;
			
			//let mlh = ML.style.height;
			ML.scrollTo(0,99999);

			//CWH.innerHTML = user_name;
			//CWH.innerHTML = this.innerHTML;

			//A = document.getElementsByClassName("*");
			MS = document.getElementsByClassName("messages_sent");
			MR = document.getElementsByClassName("messages_received");

			if(resources) {
				let ci = setInterval(check_for_new_messages, 1000);
			}
		}
	};
	xmlhttp.open("POST", "../php/chats/show_messages.php?q=" + user_name, true);
	xmlhttp.send();
}
function send_new_message() {
	console.log(40);

	if(TNM.value == "" || TK.value == "") {
		return;
	}

	do_amazing_animation_z("55vw", "0vh", 7, "5vw", "10vh");

	let EM = encryption(TNM.value);

	console.log(TNM.value + " " + TK.value);

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(41);

			let newDiv = document.createElement("div");
			newDiv.className = "messages_sent";

			let newText = document.createTextNode(TNM.value);
			newDiv.appendChild(newText);

			ML.appendChild(newDiv);

			/*ML.innerHTML += this.responseText;*/

			ML.scrollBy(0,100);
		}
	};
	xmlhttp.open("POST", "../php/chats/send_new_message.php?q=" + EM, true);
	xmlhttp.send();
}

function select_images() {
	if(current.chat) {
		document.getElementById("select_images").click();
		document.getElementsByClassName("sending")[0].style.visibility = "visible";
	}
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

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			/*
			let newDiv = document.createElement("div");
			newDiv.className = "MessagesReceived";
			let newText = document.createTextNode(this.responseText);
			newDiv.appendChild(newText);
			content.appendChild(newDiv);
			*/
			//let newRN = <?php echo $_SESSION['RowNumber']?>;
			if(this.responseText != "") {
				//ML.innerHTML += this.responseText;

				const result = JSON.parse(this.responseText);
				result.forEach(r => {
					//r.forEach(c => {
						let dm = decryption(r);

						/*ne = CreateElement("MessagesReceived","NULL",dm);
						ML.appendChild(ne);*/

						ML.innerHTML += "<div class='messages_received'>" + dm + "</div>";
					//});
				});

				ML.scrollBy(0,500);
				/*ML.scrollBottom();
				/*ML.scrollTo(0,500);
				(last div tag in message list).scrollIntoView();*/
			}
		}
	};
	xmlhttp.open("POST", "../php/chats/check_for_new_messages.php", true);
	xmlhttp.send();
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