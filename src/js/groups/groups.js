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










