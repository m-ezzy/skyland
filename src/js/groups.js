function load_groups(t) {
	current.chat.open = 0;
	current.group.open = 1;

	if(content.groups.loaded_already) {
		//if common and groups are already loaded before
		CL.innerHTML = content.groups.CL;
		SR.innerHTML = content.groups.SR;
		CH.innerHTML = content.groups.CH;
		ML.innerHTML = content.groups.ML;
	} else if(common_loaded) {
		TS.removeEventListener("keyup", search_user);
		BS.removeEventListener("click", search_user);

		load_groups_from_server();
	} else {
		load_common();
		load_groups_from_server();
	}

	do_amazing_animation("0vw", "10vh", "10vw", "5vh");
}
function load_groups_from_server() {
	content.groups.loaded_already = 1;

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let c = "";

			let r = new Array();
			r = JSON.parse(this.responseText);

			let i = 0;
			//let s;
			if(r[0] != "0") {
			while(s = r[i]) {
				//s = JSON.parse(r[i]);

				//let s = result['chats'][i];

				//let s = r[i];
				let path;
				if(s.extension) {
					path = "../../data/groups/icons/" + s.names + "." + s.extension;
				} else {
					path = "../../media/images/place_holder3.png";
				}

				c += "<div onclick='show_messages_groups(this, " + s.names + ")'>";
				c += "<img src='" + path + "'>";
				c += s.names;
				c += "</div>";

				i++;
			}
			}
			CL.innerHTML = c;
			content.groups.CL = c;

			SR.innerHTML = "";
			content.groups.SR = "";

			c = "<input type='text' id='text_add_member'>";
			c += "<div class='button' id='button_add_member' onclick='add_member()'> add member </div>";

			C.innerHTML += c;

			CL.firstElementChild.click(this, r[0].names);

			content.chats.CH = CH.innerHTML;

			content.chats.ML = ML.innerHTML;

			TAM = document.getElementById("text_add_member");
			BAM = document.getElementById("button_add_member");

			TS.addEventListener("keyup", search_groups);
			BS.addEventListener("click", search_groups);
		}
	};
	//xmlhttp.setRequestHeader("Access-Control-Allow-Origin": "*");
	xmlhttp.open("POST", "../php/groups/load_groups2.php", true);
	xmlhttp.send();
}
function search_groups() {
	if(TS.value == "") {
		return;
	}
	//search_results_visible();

	do_amazing_animation("35vw", "0vh", "5vw", "10vh");

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			SR.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("GET", "../php/groups/search_groups.php?q=" + TS.value, true);
	xmlhttp.send();
}
function take_to_that_group(t, group_name) {
	//CL.innerHTML = CLinnerHTML;
	SR.style.visibility = "hidden";
	//SR.innerHTML = "";

	show_messages_groups(t, group_name);
}
function send_request_to_join_group(group_name) {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			search_results_hidden();
		}
	};
	xmlhttp.open("POST", "../php/groups/send_request_to_join_group.php?q=" + group_name, true);
	xmlhttp.send();
}
function create_new_group() {
	//let nd = document.createElement('div');
	//gl.append(nd);

	//gl.append(create_div_tag('groups_list_div', NULL, NULL));

	let group_name = TS.value;

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//gl.innerHTML += "<div onclick='show_messages_groups(this, " + group_name + ")'>";
			
			search_results_hidden();
			
			CL.innerHTML += this.responseText;

			//show_messages_groups(group_name);
		}
	};
	xmlhttp.open("POST", "../php/groups/create_new_group.php?q=" + group_name, true);
	xmlhttp.send();
}
function show_messages_groups(t, group_name) {
	do_amazing_animation("10vw", "10vh", "30vw", "10vh");

	CH.innerHTML = t.innerHTML + " : ";

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let result = Array();
			result = JSON.parse(this.responseText);

			let i = 0;
			let r = "";

			while(o = result[i]) {
				r += (o.members + " , ");
				i++;
			}
			CH.innerHTML += r;
		}
	};
	xmlhttp.open("POST", "../php/groups/get_members.php?q=" + group_name, true);
	xmlhttp.send();

	//console.log(this);
	let ML = document.getElementById("messages_list");
	ML.innerHTML = "";

	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			//ML.innerHTML = this.responseText;

			let result = Array();
			result = JSON.parse(this.responseText);

			let user_name = result[0];
			/*let members = result[0].members;*/

			let i = 1;
			while(o = result[i]) {
				let who;
				if(o.sent_by == user_name) {
					who = "messages_sent";
				} else {
					who = "messages_received";
				}

				let new_element = document.createElement("div");
				new_element.className = who;

				let text_node = document.createTextNode(o.sent_by + " : " + o.messages);
				new_element.appendChild(text_node);

				ML.appendChild(new_element);

				i++;
			}

			ML.scrollTo(0, 99999);

			if(resources) {
				//let ci = setInterval(check_for_new_messages_groups, 1000);
			}
		}
	};
	xmlhttp.open("POST", "../php/groups/show_messages.php?q=" + group_name, true);
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
	xmlhttp.open("POST", "../php/groups/send_new_message.php?q=" + TNMG.value, true);
	xmlhttp.send();
}
function add_member() {
	do_amazing_animation("90vw", "0vh", "10vw", "10vh");
	//console.log(TAM);

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "1") {
				HG.innerHTML += TAM.value + " , ";
			}
			//console.log(TAM.value);
		}
	};
	xmlhttp.open("POST", "../php/groups/add_member.php?q=" + TAM.value, true);
	xmlhttp.send();
}










