
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
			chats.previous[chats.current].conversation.appendChild(create_div("sent messages", "", "", chats.tm.value));
			chats.previous[chats.current].rows += 1;
			chats.previous[chats.current].conversation.scrollBy(0,100);
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
			chats.previous[chats.current].conversation.appendChild(create_image("sent", "", "", "../../data/chats/chat_between_" + this.responseText, w, h));
			chats.previous[chats.current].rows += 1;
			chats.previous[chats.current].conversation.scrollBy(0,100);
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
			chats.previous[chats.current].conversation.appendChild(create_video("sent", "", "", "../../data/chats/chat_between_" + this.responseText, w, h));
			chats.previous[chats.current].rows += 1;
			chats.previous[chats.current].conversation.scrollBy(0,100);
		}
	};
}
