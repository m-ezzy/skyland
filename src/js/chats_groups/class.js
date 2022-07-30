class Chats_Groups extends Common {
	static sending = document.getElementsByClassName("sending");

	static snm = document.getElementsByClassName("send_new_media")[0];
	
	static bi = document.getElementsByClassName("button " + Common.media_types[0])[0];
	static bv = document.getElementsByClassName("button " + Common.media_types[1])[0];
	static ba = document.getElementsByClassName("button " + Common.media_types[2])[0];
	static bd = document.getElementsByClassName("button " + Common.media_types[3])[0];
	static bl = document.getElementsByClassName("button " + Common.media_types[4])[0];

	static tm = document.getElementsByClassName("text message")[0];
	static bm = document.getElementsByClassName("button message")[0];

	constructor(who) {
		super(who);

		this.tk;
		this.bed;
	}
	load() {
		super.load();

		let c = "";
		c += "<div class='button voice-call' onclick='" + this.who + ".create_new_voice_call()'> voice call </div>";
		c += "<input type='text' class='text key' placeholder='enter key of this conversation' value='0' oninput='" + this.who + ".show_decrypted_media()'>";
		c += "<div class='button key' onclick='" + this.who + ".e_d()'> encrypt or decrypt </div>";

		this.ch.innerHTML += c;

		this.tk = this.element.getElementsByClassName("text key")[0];
		this.bed = this.element.getElementsByClassName("button e_d")[0];
	}
	async load_data() {
		super.load_data();

		let response = await fetch("src/php/" + this.who + "/load.php", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''})
		let result = await response.json();

		if(!result) {
			return;
		}

		let my_name;
		let path;
		let text;

		let i = 0;
		result.forEach(r => {
			path = "data/";

			if (this.who == 'chats') {
				my_name = r.user_name;
				path += "profile_pictures/";
				text = r.user_name + " " + r.first_name + " " + r.last_name;
			} else if (this.who == 'groups') {
				my_name = r.group_name;
				path += this.who + "/icons/";
				text = r.group_name + " " + r.display_name;
			} else if (this.who == 'channels') {
				my_name = r.channel_name;
				path += this.who + "/icons/";
				text = r.channel_name + " " + r.display_name;
			}

			if(r.extension == null) {
				path = "media/images/place_holder_" + this.who + ".png";
			} else {
				path += my_name + "." + r.extension;
			}

			/*
			c += "<div onclick='" + this.who + ".show_conversation(this," + i + ")'</div>";
			c += "<img src='" + path + "' />";
			c += "<div class='new_media_indicator'></div>";
			c += "</div>";
			*/

			let div = create_div("", "", this.who + ".show_conversation(this,'" + my_name + "')", text);
			let img = create_image("", "", "", path);
			let nmi = create_div('new_media_indicator', '', '', '');
			div.appendChild(img);
			div.appendChild(nmi);
			//this.element.appendChild(nmi);
			this.pl.appendChild(div);

			let e = create_div('conversation', this.who + '_' + my_name, '', '');
			e.setAttribute('onscroll', this.who + ".on_scroll_event('" + my_name + "')");
			this.element.appendChild(e);

			if (this.who == 'chats') {
				this.previous.push({user_name: (r.user_name), first_name: (r.first_name), last_name: (r.last_name), extension: (r.extension), rows: -1});
				//console.log(this.previous);
			} else if (this.who == 'groups') {
				this.previous.push({group_name: (r.group_name), display_name: (r.display_name), extension: (r.extension), rows: -1});
			} else if (this.who == 'channels') {
				this.previous.push({channel_name: (r.channel_name), display_name: (r.display_name), extension: (r.extension), rows: -1});
			}
			
			i++;
		});

		this.nmi = this.element.getElementsByClassName('new_media_indicator');
		this.conversation = this.element.getElementsByClassName('conversation');

		//this.show_conversation(this.pl.getElementsByTagName('div')[0], result[0].user_name); //this.pl.firstElementChild
		this.current = 0;

		this.loaded = 1;
		//this.pl.firstElementChild.click();

		//this.check_for_new_media();
	}
	//can't use 'this' in function parameters, using 't' instead of 'this'
	async show_conversation(t, who_name) {
		//console.log(this.current);
		//console.log(this.conversation);
		if (this.current != -1) {
			this.conversation[this.current].style.visibility = "hidden";
		}

		if (this.who == 'chats') {
			this.current = this.previous.findIndex(u => u.user_name == who_name);
			console.log(this.current);
		} else if (this.who == 'groups') {
			this.current = this.previous.findIndex(g => g.group_name == who_name);
		}

		this.nmi[this.current].style.backgroundColor = 'rgb(0, 0, 0, 0)';
		this.nmi[this.current].innerHTML = '';

		this.ch.getElementsByTagName('div')[0].innerHTML = t.innerHTML;
		this.ch.getElementsByTagName('div')[0].removeChild(this.ch.getElementsByClassName('new_media_indicator')[0]);

		this.conversation[this.current].style.visibility = "visible";

		if (this.previous[this.current].rows != -1) {
			return;
		}
		this.previous[this.current].rows = 0;
	
		//this.current = this.previous.indexOf(user_name = who_name);
		//this.previous[this.current].conversation.innerHTML = "";

		add_enter_event();

		//do_amazing_animation('id',t.style.left, t.style.top, t.style.width);
		do_amazing_animation("10vw", "10vh", "30vw", "10vh");

		this.show_conversation_previous(who_name);
	}
	async show_conversation_previous(who_name) {
		console.log(this.conversation[this.current].scroll);
		console.log(this.conversation[this.current].scrollTop);
		console.log(this.conversation[this.current].scrollTop.toFixed());

		let response = await fetch("src/php/" + this.who + "/show_conversation.php?q=" + who_name, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let result = await response.json();

		console.log('lllllllllllllllllll');
		console.log(result[0]);
		if (result[0] == 0) {
			return;
		}

		let first;
		let second;
		let path;

		if (this.who == 'chats') {
			first = me.user_name < who_name ? me.user_name : who_name;
			second = me.user_name > who_name ? me.user_name : who_name;

			path = "chat_between_" + first + "_" + second;
		} else if (this.who == 'groups') {
			path = "group_" + who_name;
		}

		let ddd = this.conversation[this.current].innerHTML;
		this.conversation[this.current].innerHTML = '';

		//let st = 0;
		let i = 0;
		let r;
		while (r = result[i]) {
			let e;
			let class_media = (r.sent_by == me.user_name) ? "sent" : "received";

			if(r.messages) {
				let m = decryption(r.messages, this.tk.value);
				e = create_div(class_media + " messages", "", "", m);
			} else if(r.images) {
				e = create_image(class_media, "", "", "data/" + this.who + "/" + path + "/" + r.ROWNUM + "." + r.images, Common.w, Common.h);
			} else if(r.videos) {
				e = create_video(class_media, "", "", "data/" + this.who + "/" + path + "/" + r.ROWNUM + "." + r.videos, Common.w, Common.h);
			}

			this.conversation[this.current].append(e);
			//st += this.conversation[this.current].lastElementChild.style.height;
			//console.log(st);
			i++;
		}
		this.conversation[this.current].innerHTML += ddd;

		this.conversation[this.current].scrollTop = i*50;
		last_known = i*50;

		this.previous[this.current].rows += i;
	}
	on_scroll_event(who_name) {
		if (this.conversation[this.current].scrollTop != 0) {
			return;
		}
		if (last_known == 0) {
			return;
		}
		last_known = 0;

		this.show_conversation_previous(who_name);
		/*
		if (!running) {
			window.requestAnimationFrame(function() {
				chats.show_conversation_previous(who_name);
				running = false;
			});
			running = true;
		}*/
	}
	async send_message() {
		if(Chats_Groups.tm.value == "" || this.tk.value == "") {
			return;
		}

		do_amazing_animation_z("55vw", "0vh", 7, "5vw", "10vh");

		let new_name;
		if (this.who == 'chats') {
			new_name = this.previous[this.current].user_name;
		} else if (this.who == 'groups') {
			new_name = this.previous[this.current].group_name;
		}

		let em = encryption(Chats_Groups.tm.value, this.tk.value);

		let response = await fetch("src/php/" + this.who + "/send_message.php?n=" + new_name + "&m=" + em, {
			method: 'POST', 
			mode: 'no-cors', 
			headers: {
				'Content-Type':'application/x-www-form-urlencoded' 
			}, 
			body: '' 
		});
		console.log(response);

		let result = await response.text();
		console.log(result);

		this.conversation[this.current].appendChild(create_div("sent messages", "", "", Chats_Groups.tm.value));
		this.conversation[this.current].scrollBy(0, 200);
	}
	async send_images() {
		Chats_Groups.sending[0].style.visibility = "hidden";

		const fd = new FormData();
		let all_files = document.getElementsByClassName("select_images")[0];
		fd.append("select_images", all_files.files[0]);

		let text = "";
		let response = await fetch("src/php/" + this.who + "/send_images.php?q=" + this.previous[this.current].user_name, {
			method: 'POST',
			body: fd
		})
		.then((response) => response.text())
		.then((value) => {
			text = value;

			this.conversation[this.current].appendChild(create_image("sent", "", "", "data/" + this.who + "/" + text, Common.w, Common.h));
			this.previous[this.current].rows += 1;
			this.conversation[this.current].scrollBy(0, 200);
		});
	}
	async send_videos() {
		Chats_Groups.sending[1].style.visibility = "hidden";
	
		let xhr = new XMLHttpRequest();
		//let file = document.getElementById('select_videos').files[0];
		let file = this.element.getElementsByClassName("select_videos")[0].files[0];
	
		let fd = new FormData();
		fd.append("select_videos", file);
	
		xhr.open("POST", "src/php/this/send_videos.php", true);
		//xhr.setRequestHeader("Content-type","image");
		xhr.send(fd);
	
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				let w = Math.floor(innerWidth/5);
				let h = Math.floor(innerHeight/5);
				this.previous[this.current].conversation.appendChild(create_video("sent", "", "", "data/this/chat_between_" + this.responseText, Common.w, Common.h));
				this.previous[this.current].rows += 1;
				this.previous[this.current].conversation.scrollBy(0, 200);
			}
		};
	}

	select_images() {
		//document.getElementById("select_images").click();
		Chats_Groups.sending[0].getElementsByClassName("select_images")[0].click();
		document.getElementsByClassName("sending")[0].style.visibility = "visible";
	}
	select_videos() {
		//document.getElementById("select_videos").click();
		Chats_Groups.element.getElementsByClassName("select_videos")[0].click();
		document.getElementsByClassName("sending")[1].style.visibility = "visible";
	}
	select_audios() {
		//document.getElementById("select_audios").click();
		Chats_Groups.element.getElementsByClassName("select_audios")[0].click();
		document.getElementsByClassName("sending")[2].style.visibility = "visible";
	}
	select_documents() {
		//document.getElementById("select_documents").click();
		Chats_Groups.element.getElementsByClassName("select_documents")[0].click();
		document.getElementsByClassName("sending")[3].style.visibility = "visible";
	}
	select_location() {
		//document.getElementById("select_location").click();
		Chats_Groups.element.getElementsByClassName("select_location")[0].click();
		document.getElementsByClassName("sending")[4].style.visibility = "visible";
	}

	close_images() {
		document.getElementsByClassName("sending")[0].style.visibility = "hidden";
	}
	close_videos() {
		document.getElementsByClassName("sending")[1].style.visibility = "hidden";
	}
	close_audios() {
		document.getElementsByClassName("sending")[2].style.visibility = "hidden";
	}
	close_documents() {
		document.getElementsByClassName("sending")[3].style.visibility = "hidden";
	}
	close_location() {
		document.getElementsByClassName("sending")[4].style.visibility = "hidden";
	}

	show_decrypted_media() {
		let key = this.tk.value;
		if (isNaN(key)) {
			return;
		}
		this.conversation[this.current].getElementsByClassName('received message').forEach(m => {
			m.innerHTML = decryption(m.innerHTML, key);
		});
	}
}
