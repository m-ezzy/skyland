function load_groups(t) {
	if(groups.open) {
		return;
	}

	Content.current.open = 0;
	Content.current.element.style.visibility = "hidden";

	Content.current = groups;
	groups.open = 1;
	groups.element.style.visibility = "visible";

	if(groups.loaded_already) {
		return;
	}

	groups.element.innerHTML = load_common("_g");
	groups.initialize();
	load_groups_from_server();

	do_amazing_animation("0vw", "10vh", "10vw", "5vh");
	t.style.backgroundColor = "black";
}
function load_groups_from_server() {
	groups.loaded_already = 1;

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let c = "";

			let r = new Array();
			r = JSON.parse(this.responseText);

			if (r[0] == "0") {
				return;
			}

			let i = 0;
			//let s;
			while (s = r[i]) {
				//s = JSON.parse(r[i]);

				//let s = result['chats'][i];

				//let s = r[i];
				let path;
				if (s.extension) {
					path = "../../data/groups/icons/" + s.names + "." + s.extension;
				} else {
					path = "../../media/images/place_holder_groups.png";
				}

				c += "<div onclick='show_conversation_g(this, " + s.names + ")'>";
				c += "<img src='" + path + "'>";
				c += s.names;
				c += "</div>";

				groups.element.appendChild(create_div("conversation", "group_conversation_" + s.names, "", ""));
				let e = document.getElementById("group_conversation_" + s.names);
				groups.previous.push({names: (s.names), members: [], extension: (s.extension), rows: -1, conversation: e});

				i++;
			}
			groups.cl.innerHTML = c;
			groups.sr.innerHTML = "";

			groups.element.appendChild(create_input_text("", "text_add_member", "", ""));
			groups.element.appendChild(create_div("button", "button_add_member", "add_member", "add member"));

			groups.tam = groups.element.getElementById("text_add_member");
			groups.bam = groups.element.getElementById("button_add_member");

			show_conversation_g(groups.cl.firstElementChild, r[0].names);
		}
	};
	//xhr.setRequestHeader("Access-Control-Allow-Origin": "*");
	xhr.open("POST", "../php/groups/load_groups2.php", true);
	xhr.send();
}
function search_groups() {
	if(TS.value == "") {
		return;
	}
	//search_results_visible();

	do_amazing_animation("35vw", "0vh", "5vw", "10vh");

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			SR.innerHTML = this.responseText;
		}
	};
	xhr.open("GET", "../php/groups/search_groups.php?q=" + TS.value, true);
	xhr.send();
}
function take_to_that_group(t, group_name) {
	//CL.innerHTML = CLinnerHTML;
	SR.style.visibility = "hidden";
	//SR.innerHTML = "";

	show_messages_groups(t, group_name);
}
function send_request_to_join_group(group_name) {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			search_results_hidden();
		}
	};
	xhr.open("POST", "../php/groups/send_request_to_join_group.php?q=" + group_name, true);
	xhr.send();
}
function create_new_group() {
	//let nd = document.createElement('div');
	//gl.append(nd);

	//gl.append(create_div_tag('groups_list_div', NULL, NULL));

	let group_name = TS.value;

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//gl.innerHTML += "<div onclick='show_messages_groups(this, " + group_name + ")'>";
			
			search_results_hidden();
			
			CL.innerHTML += this.responseText;

			//show_messages_groups(group_name);
		}
	};
	xhr.open("POST", "../php/groups/create_new_group.php?q=" + group_name, true);
	xhr.send();
}
function show_messages_groups(t, group_name) {
	do_amazing_animation("10vw", "10vh", "30vw", "10vh");

	CH.innerHTML = t.innerHTML + " : ";

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
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
	xhr.open("POST", "../php/groups/get_members.php?q=" + group_name, true);
	xhr.send();

	//console.log(this);
	let ML = document.getElementById("messages_list");
	ML.innerHTML = "";

	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
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
	xhr.open("POST", "../php/groups/show_messages.php?q=" + group_name, true);
	xhr.send();
}
function send_message_g() {
	groups.send_message();
}
function add_member() {
	do_amazing_animation("90vw", "0vh", "10vw", "10vh");
	//console.log(TAM);

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "1") {
				HG.innerHTML += TAM.value + " , ";
			}
			//console.log(TAM.value);
		}
	};
	xhr.open("POST", "../php/groups/add_member.php?q=" + TAM.value, true);
	xhr.send();
}










