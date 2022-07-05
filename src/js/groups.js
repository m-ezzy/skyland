function load_groups(t) {
	//let content = document.getElementById("content");

	do_amazing_animation("0vw", "10vh", "10vw", "5vh");

	if(content.groups) {
		C.innerHTML = content.groups;
		return;
	}

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let c;

			c = "<div class='button' id='button_back_groups' onclick='search_results_hidden_groups()'> back </div>";
			c += "<input type='text' placeholder='type group name here to search' id='text_search_groups' onfocus='search_results_visible_groups()' oninput='search_groups()'>";
			c += "<div class='button' id='button_search_groups' onclick='search_groups()'> search </div>";

			c += "<div id='search_results_groups'></div>";
			c += "<div id='groups_list'>";

			/*
			let r = new Array();
			r = JSON.parse(this.responseText);

			//let s = new Array();
			//s = JSON.parse(result);

			let i = 0;
			//let s;
			if(r != "0") {
			while(s = r[i]) {
				//s = JSON.parse(r[i]);

				//let s = result['chats'][i];

				//let s = r[i];
				let path = s.extension ? "../../data/groups/icons/" + s.names + "." + s.extension : "../../media/images/place_holder3.png";
				//let path =  "../../media/images/place_holder3.png";

				c += "<div onclick='show_messages_groups(this, " + s.names + ")'>";
				c += "<img src='" + path + "'>";
				c += s.names;
				c += "</div>";
				//});
				i++;
			}
			}
			*/

			c += this.responseText;
			c += "</div>";

			c += "<div id='header_groups'></div>";
			c += "<input type='text' id='text_add_member'>";
			c += "<div class='button' id='button_add_member' onclick='add_member()'> add member </div>";

			c += "<div id='messages_list_groups'>";
			c += "select any group to show your messages with them here";
			c += "</div>";

			c += "<div class='button' id='button_upload_images_groups' onclick='upload_images_groups()'> images </div>";
			c += "<div class='button' id='button_upload_videos_groups' onclick='upload_videos_groups()'> videos </div>";
			c += "<div class='button' id='button_upload_audios_groups' onclick='upload_audios_groups()'> audios </div>";
			c += "<div class='button' id='button_upload_document_groups' onclick='upload_document_groups()'> document </div>";
			c += "<div class='button' id='button_upload_location_groups' onclick='upload_location_groups()'> location </div>";

			c += "<input type='text' placeholder='type a new message' id='text_new_message_groups' onfocus='add_event()' onblur='remove_event()'>";
			c += "<div class='button' id='button_new_message_groups' onclick='send_new_message_groups()'> send </div>";

			content.groups = c;
			C.innerHTML = c;



			BBG = document.getElementById("button_back_groups");
			TSG = document.getElementById("text_search_groups");
			BSG = document.getElementById("button_search_groups");

			SRG = document.getElementById("search_results_groups");

			GL = document.getElementById("groups_list");

			HG = document.getElementById("header_groups");

			TAM = document.getElementById("text_add_member");
			BAM = document.getElementById("button_add_member");

			MLG = document.getElementById("messages_list_groups");

			TNMG = document.getElementById("text_new_message_groups");
			BNMG = document.getElementById("button_new_message_groups");

			if(resources) {
				//TSU.setAttribute(onkeyup:'SearchUser(this.value)');
				//don't know this works or not
				//alternatively i can simply add event listener

				TSG.addEventListener("keyup",function(e) {
					search_groups();
				});
			}
		}
	};
	//xmlhttp.setRequestHeader("Access-Control-Allow-Origin": "*");
	xmlhttp.open("POST", "../php/groups/load_groups2.php", true);
	xmlhttp.send();
}
function search_results_hidden_groups() {
	do_amazing_animation("10vw", "0vh", "5vw", "10vh");
	SRG.style.visibility = "hidden";
}
function search_results_visible_groups() {
	SRG.style.visibility = "visible";
}
function search_groups() {
	if(TSG.value == "") {
		return;
	}
	search_results_visible_groups();

	do_amazing_animation("35vw", "0vh", "5vw", "10vh");

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			SRG.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("GET", "../php/groups/search_groups.php?q=" + TSG.value, true);
	xmlhttp.send();
}
function take_to_that_group(t, group_name) {
	//CL.innerHTML = CLinnerHTML;
	SRG.style.visibility = "hidden";
	//SR.innerHTML = "";

	show_messages_groups(t, group_name);
}
function send_request_to_join_group(group_name) {
	let group_name = document.getElementById("text_search_groups").value;

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//gl.innerHTML += "<div onclick='show_messages_groups(this, " + group_name + ")'>";

			search_results_hidden_groups();
			
			GL.innerHTML += this.responseText;

			//show_messages_groups(group_name);
		}
	};
	xmlhttp.open("POST", "../php/groups/send_request_to_join_group.php?q=" + group_name, true);
	xmlhttp.send();
}
function create_new_group() {
	//let nd = document.createElement('div');
	//gl.append(nd);

	//gl.append(create_div_tag('groups_list_div', NULL, NULL));

	let group_name = document.getElementById("text_search_groups").value;

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//gl.innerHTML += "<div onclick='show_messages_groups(this, " + group_name + ")'>";
			
			search_results_hidden_groups();
			
			GL.innerHTML += this.responseText;

			//show_messages_groups(group_name);
		}
	};
	xmlhttp.open("POST", "../php/groups/create_new_group.php?q=" + group_name, true);
	xmlhttp.send();
}
function show_messages_groups(t, group_name) {
	do_amazing_animation("10vw", "10vh", "30vw", "10vh");

	let hg = document.getElementById("header_groups");

	hg.innerHTML = t.innerHTML + " : ";

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
			hg.innerHTML += r;
		}
	};
	xmlhttp.open("POST", "../php/groups/get_members.php?q=" + group_name, true);
	xmlhttp.send();

	//console.log(this);
	let MLG = document.getElementById("messages_list_groups");
	MLG.innerHTML = "";

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
					who = "messages_sent_groups";
				} else {
					who = "messages_received_groups";
				}

				let new_element = document.createElement("div");
				new_element.className = who;

				let text_node = document.createTextNode(o.sent_by + " : " + o.messages);
				new_element.appendChild(text_node);

				MLG.appendChild(new_element);

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










