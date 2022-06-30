function load_groups() {
	//let content = document.getElementById("content");

	if(groups) {
		content.innerHTML = groups;
		return;
	}

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let c;

			c = "<div class='button' id='button_create_new_group' onclick='create_new_group()'> + </div>";
			c += "<input type='text' placeholder='type group name here to search' id='text_search_groups' oninput='search_groups()'>";
			c += "<div class='button' id='button_search_groups' onclick='search_groups()'> search </div>";

			c += "<div id='search_results_groups'></div>";
			c += "<div id='groups_list'>";

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
				let path = s.extension ? "../data/groups/icons/" + s.names + "." + s.extension : "../media/images/place_holder3.png";

				c += "<div onclick='show_messages_groups(this, " + s.names + ")'>";
				c += "<img src='" + path + "'>";
				c += s.names;
				c += "</div>";
				//});
				i++;
			}
			c += "</div>";

			c += "<div id='header_groups'></div>";
			c += "<input type='text' id='text_add_user_to_group'>";
			c += "<div class='button' id='button_add_user_to_group' onclick='add_user_to_group()'> add member </div>";

			c += "<div id='messages_list_groups'>";
			c += "select any group to show your messages with them here";
			c += "</div>";

			c += "<div class='button' id='button_upload_images' onclick='upload_images()'> images </div>";
			c += "<div class='button' id='button_upload_videos' onclick='upload_images()'> videos </div>";
			c += "<div class='button' id='button_upload_audios' onclick='upload_images()'> audios </div>";
			c += "<div class='button' id='button_upload_location' onclick='upload_images()'> location </div>";

			c += "<input type='text' placeholder='type a new message' id='text_new_message_groups' onfocus='add_event()' onblur='remove_event()'>";
			c += "<div class='button' id='button_new_message_groups' onclick='send_new_message_groups()'> send </div>";

			groups = c;
			content.innerHTML = c;


			/*
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
			*/

			if(resources) {
				//TSU.setAttribute(onkeyup:'SearchUser(this.value)');
				//don't know this works or not
				//alternatively i can simply add event listener

				TSU.addEventListener("keyup",function(e) {
					search_groups();
				});
			}
		}
	};
	//xmlhttp.setRequestHeader("Access-Control-Allow-Origin": "*");
	xmlhttp.open("POST", "load_groups.php", true);
	xmlhttp.send();
}
function create_new_group() {
	let gl = document.getElementById('groups_list');
	//let nd = document.createElement('div');
	//gl.append(nd);

	//gl.append(create_div_tag('groups_list_div', NULL, NULL));

	let group_name = document.getElementById("text_search_groups").value;

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//gl.innerHTML += "<div onclick='show_messages_groups(this, " + group_name + ")'>";
			
			gl.innerHTML += this.responseText;

			//show_messages_groups(group_name);
		}
	};
	xmlhttp.open("POST", "create_new_group.php?q=" + group_name, true);
	xmlhttp.send();
}
function show_messages_groups(t, group_name) {
	do_amazing_animation("10vw", "10vh", "30vw");

	document.getElementById("header_groups").innerHTML = t.innerHTML;

	//console.log(this);
	let MLG = document.getElementById("messages_list_groups");
	MLG.innerHTML = "";

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			//ML.innerHTML = this.responseText;

			let result = Array();
			result = JSON.parse(this.responseText);
			
			let i = 0;
			while(o = result[i]) {
				let who;
				if(o.sent_by == user_name) {
					who = "messages_received_groups";
				} else {
					who = "messages_sent_groups";
				}

				let new_element = document.createElement("div");
				new_element.className = who;

				let text_node = document.createTextNode(o.sent_by + " : " + o.message);
				new_element.appendChild(text_node);

				MLG.appendChild(new_nlement);

				i++;
			}

			MLG.scrollTo(0, 99999);

			MSG = document.getElementsByClassName("messages_sent_groups");
			MRG = document.getElementsByClassName("messages_received_groups");

			if(resources) {
				//let ci = setInterval(check_for_new_messages_groups, 1000);
			}
		}
	};
	xmlhttp.open("POST", "show_messages_groups.php?q=" + group_name, true);
	xmlhttp.send();
}
function send_new_message_groups() {
	let MLG = document.getElementById("messages_list_groups");
	let TNMG = document.getElementById("text_new_message_groups");

	if(TNMG.value == "") {
		return;
	}

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let new_div = document.createElement("div");
			new_div.className = "messages_sent_groups";

			let new_text = document.createTextNode(TNMG.value);
			new_div.appendChild(new_text);

			MLG.appendChild(new_div);

			/*ML.innerHTML += this.responseText;*/

			MLG.scrollBy(0,100);
		}
	};
	xmlhttp.open("POST", "send_new_message_groups.php?q=" + TNMG.value, true);
	xmlhttp.send();
}
function add_user_to_group() {
	let TAUTG = document.getElementById("text_add_user_to_group");
	console.log(TAUTG);

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let r = this.responseText;
			console.log(TAUTG.value);
		}
	};
	xmlhttp.open("POST", "add_user_to_group.php?q=" + TAUTG.value, true);
	xmlhttp.send();
}










