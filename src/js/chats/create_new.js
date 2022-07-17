/*
function create_new_chat(user_name, first_name, last_name, extension) {
	chats.sr.style.visibility = "hidden";

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {

			chats.element.appendChild(create_div("conversation", "chat_between_me_" + user_name, "", ""));
			//let y = chats.element.getElementsByClassName("conversation")[chats.previous.length];
			let y = document.getElementById("chat_between_me_" + user_name);
			chats.previous.push({user_name: (user_name), first_name: (first_name), last_name: (last_name), extension: (extension), rows: 0, conversation: y});

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
}*/
async function create_new_chat(user_name, first_name, last_name, extension) {
	chats.sr.style.visibility = "hidden";

	const response = await fetch("../php/chats/create_new_chat.php", {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_name=' + user_name});

	//let r = response.json();

	chats.element.appendChild(create_div("conversation", "chat_between_me_" + user_name, "", ""));
	//let y = chats.element.getElementsByClassName("conversation")[chats.previous.length];
	let y = document.getElementById("chat_between_me_" + user_name);
	chats.previous.push({user_name: (user_name), first_name: (first_name), last_name: (last_name), extension: (extension), rows: 0, conversation: y});

	let img = document.createElement("img");
	img.src = extension != "null" ? "../../data/profile_pictures/" + user_name + "." + extension : "../../media/images/place_holder3.png";

	let oc = "show_conversation(this, " + user_name + ")";
	let text = user_name + " " + first_name + " " + last_name;
	let temp = create_div("chat", "", oc, text);

	temp.appendChild(img);
	chats.cl.appendChild(temp);

	show_conversation(chats.cl.lastElementChild, user_name);
}