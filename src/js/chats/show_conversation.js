
//can't use 'this' in function parameters, using 't' instead of 'this'
function show_conversation(t, user_name) {
	let key = chats.tk.value;
	if (isNaN(key)) {
		return;
	}

	chats.ch.innerHTML = t.innerHTML;
	chats.previous[chats.current].conversation.style.visibility = "hidden";
	document.getElementById("chat_between_me_" + user_name).style.visibility = "visible";

	for (let i=0; i < chats.previous.length ; i++) {
		if (chats.previous[i].user_name == user_name) {
			chats.current = i;
			break;
		}
	}

	if (chats.previous[chats.current].rows != -1) {
		return;
	}

	//chats.current = chats.previous.indexOf(user_name);
	//chats.previous[chats.current].conversation.innerHTML = "";

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

				let first = me.user_name < user_name ? me.user_name : user_name;
				let second = me.user_name > user_name ? me.user_name : user_name;
				
				if(o.message) {
					let m = decryption(o.message, chats.tk.value);
					console.log(m);
					
					e = create_div(class_media + " messages", "", "", m);
				} else if(o.images) {
					e = create_image(class_media, "", "", "../../data/chats/chat_between_" + first + "_" + second + "/" + o.ROWNUM + "." + o.images, w, h);
				} else if(o.videos) {
					e = create_video(class_media, "", "", "../../data/chats/chat_between_" + first + "_" + second + "/" + o.ROWNUM + "." + o.videos, w, h);
				}
				chats.previous[chats.current].conversation.appendChild(e);
				i++;
			}
			chats.previous[chats.current].rows = i;
			//let mlh = chats.previous[chats.current].conversation.style.height;
			chats.previous[chats.current].conversation.scrollTo(0,99999);

			//MS = document.getElementsByClassName("sent messages");
			//MR = document.getElementsByClassName("received messages");

			/*
			if(resources) {
				let ci = setInterval(check_for_new_messages, 1000);
			}*/
			check_for_new_messages();
		}
	};
	xhr.open("POST", "../php/chats/show_conversation.php?q=" + user_name, true);
	xhr.send();
}
