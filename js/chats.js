
function load_chats() {
	do_amazing_animation("0vw", "5vh", "10vw", "5vh");

	let content = document.getElementById("content");

	if(chats) {
		content.innerHTML = chats;
		return;
	}
	
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let c;

			c = "<div class='button' id='button_back' onclick='search_results_hidden()'> back </div>";
			c += "<input type='text' placeholder='type a name to search' id='text_search_user' onfocus='search_results_visible()'>";
			c += "<div class='button' id='button_search_user' onclick='search_user()'> search </div>";

			c += "<div id='search_results'></div>";
			c += "<div id='chat_list'>";

			let r = new Array();
			r = JSON.parse(this.responseText);

			/*let s = new Array();
			s = JSON.parse(result);*/

			let i = 0;
			//let s;
			while(s = r[i]) {
				//s = JSON.parse(r[i]);

				//let s = result['chats'][i];

				//let s = r[i];
				let path = s.extension ? "../data/profile_pictures/" + s.user_name + "." + s.extension : "../media/images/place_holder3.png";

				c += "<div class='chat' onclick='show_messages(this, " + s.user_name + ")'>";
				c += "<img src='" + path + "'>";
				c += s.user_name + " " + s.first_name + " " + s.last_name;
				c += "</div>";
				//});
				i++;
			}
			c += "</div>";

			c += "<div id='header'></div>";

			c += "<input type='text' placeholder='enter key of this conversation' id='text_key' value='1'>";
			c += "<div class='button' id='button_e_d' onclick='e_d()'> encrypt / decrypt </div>";

			c += "<div id='messages_list'>";
			c += "select any chat to show your messages with them here";
			c += "</div>";

			c += "<div class='button' id='button_upload_images' onclick='upload_images()'> images </div>";
			c += "<div class='button' id='button_upload_videos' onclick='upload_images()'> videos </div>";
			c += "<div class='button' id='button_upload_audios' onclick='upload_images()'> audios </div>";
			c += "<div class='button' id='button_upload_document' onclick='upload_document()'> document </div>";
			c += "<div class='button' id='button_upload_location' onclick='upload_images()'> location </div>";

			//c += "<div class='button' id='button_check_for_new_messages' onclick='check_for_new_messages()'> check for new messages </div>";
			c += "<input type='text' placeholder='type a new message' id='text_new_message' onfocus='add_event()' onblur='remove_event()'>";
			c += "<div class='button' id='button_new_message' onclick='send_new_message()'> send </div>";

			chats = c;
			content.innerHTML = c;



			BB = document.getElementById("button_back");
			TSU = document.getElementById("text_search_user");
			BSU = document.getElementById("button_search_user");

			SR = document.getElementById("search_results");

			CL = document.getElementById("chat_list");

			CWH = document.getElementById("header");

			TK = document.getElementById("text_key");
			BED = document.getElementById("button_e_d");

			ML = document.getElementById("messages_list");

			BCNM = document.getElementById("button_check_for_new_message");
			TNM = document.getElementById("text_new_message");
			BNM = document.getElementById("button_new_message");

			if(resources) {
				//TSU.setAttribute(onkeyup:'SearchUser(this.value)');
				//don't know this works or not
				//alternatively i can simply add event listener

				TSU.addEventListener("keyup",function(e) {
					search_user();
				});
			}
		}
	};
	//xmlhttp.setRequestHeader("Access-Control-Allow-Origin": "*");
	xmlhttp.open("POST", "../php/chats/load_chats.php", true);
	xmlhttp.send();
}

//can't use 'this' in function parameters, using 't' instead of 'this'
function show_messages(t, user_name) {
	let key = parseInt(document.getElementById("text_key").value);

	if(isNaN(key)) {
		return;
	}

	//do_amazing_animation('id',t.style.left, t.style.top, t.style.width);
	do_amazing_animation("10vw", "10vh", "30vw", "10vh");

	CWH.innerHTML = t.innerHTML;

	//console.log(this);
	let ML = document.getElementById("messages_list");
	ML.innerHTML = "";

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			//ML.innerHTML = this.responseText;

			let result = Array();
			result = JSON.parse(this.responseText);
			
			let i = 0;
			while(o = result[i]) {
			//result.forEach(r => {
				//r.forEach(c => {
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
				
				i++;
			//});
			}
			
			//let mlh = ML.style.height;
			ML.scrollTo(0,99999);

			//CWH.innerHTML = user_name;
			//CWH.innerHTML = this.innerHTML;

			//A = document.getElementsByClassName("*");
			MS = document.getElementsByClassName("messages_sent");
			MR = document.getElementsByClassName("messages_received");

			if(resources) {
				let ci = setInterval(check_for_new_messages,1000);
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

	do_amazing_animation("95vw", "90vh", "5vw", "10vh");

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

function search_results_hidden() {
	SR.style.visibility = "hidden";
}
function search_results_visible() {
	SR.style.visibility = "visible";
}
function search_user() {
	if(TSU.value == "") {
		return;
	}

	do_amazing_animation("35vw", "0vh", "5vw", "10vh");

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			SR.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("GET", "../php/chats/search_user.php?q=" + TSU.value, true);
	xmlhttp.send();
}
function take_to_that_chat(user_name) {
	//CL.innerHTML = CLinnerHTML;
	SR.style.visibility = "hidden";
	//SR.innerHTML = "";

	show_messages(user_name);
}
function create_new_chat(user_name) {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//SR.style.visibility = "hidden";
			//SR.innerHTML = "";
		
			//CL.innerHTML = CLinnerHTML;
			CL.innerHTML += this.responseText;

			SR.style.visibility = "hidden";
		
			show_messages(user_name);
		}
	};
	xmlhttp.open("POST", "../php/chats/create_new_chat.php?q=" + user_name, true);
	xmlhttp.send();
}
function snm(e) {
	if(e.key == "Enter") {
		send_new_message();
	}
}
function add_event() {
	document.addEventListener("keydown",snm);

	/*let TNM = document.getElementById("TextNewMessage");
	TNM.addEventListener("keydown",send_new_message);*/
}
function remove_event() {
	document.removeEventListener("keydown",snm);

	/*let TNM = document.getElementById("TextNewMessage");
	TNM.removeEventListener("keydown",send_new_message);*/
}