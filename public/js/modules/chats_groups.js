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

		this.ca;
		this.cv;
		this.tk;
		this.bed;
	}
	load() {
		super.load();

		let c = "";
		c += "<div class='button call audio' onclick='" + this.who + ".make_new_call(6)'></div>";
		c += "<div class='button call video' onclick='" + this.who + ".make_new_call(7)'></div>";
		c += "<input type='text' class='text key' placeholder='enter key of this conversation' value='0' oninput='" + this.who + ".show_decrypted_media()'>";
		c += "<div class='button key' onclick='" + this.who + ".e_d()'> encrypt or decrypt </div>";
		this.ch.innerHTML += c;

		this.ca = this.element.getElementsByClassName("button call audio")[0];
		this.cv = this.element.getElementsByClassName("button call video")[0];

		this.tk = this.element.getElementsByClassName("text key")[0];
		this.bed = this.element.getElementsByClassName("button e_d")[0];
	}
	async load_data() {
		await super.load_data();
	}
	clicked() {
		super.clicked();

		if (this.current != -1) {
			Chats_Groups.snm.style.display = 'grid';
		}
	}
	//can't use 'this' in function parameters, using 't' instead of 'this'
	show_conversation(t, id) {
		if ( this.current == id ) { return; }

		if (this.current != -1) {
			document.getElementById(`conversation_${this.who}_${id}`).style.display = 'none';
		}

		this.current = id;

		if (innerWidth <= 400) {
			//menu_bar.element.style.display = 'none';
			MB.style.display = 'none';
			this.pl.style.display = 'none';

			Content.bb.style.display = 'none';
			Content.ts.style.display = 'none';
			Content.bs.style.display = 'none';
			this.sr.style.display = 'none';

			this.cb.style.display = 'grid';
		}

		//this.nmi[this.current].style.backgroundColor = 'rgb(0, 0, 0, 0)';
		//this.nmi[this.current].innerHTML = '';

		this.ch.getElementsByClassName('details')[0].innerHTML = t.innerHTML;
		this.ch.getElementsByClassName('details')[0].removeChild(this.ch.getElementsByClassName('new_media_indicator')[0]);

		document.getElementById(`conversation_${this.who}_${id}`).style.display = 'grid';

		Chats_Groups.snm.style.display = 'grid';

		/*
		if (this.previous[this.current].row_up != -1) {
			return;
		}
		this.previous[this.current].row_up = 0;
		*/

		//this.current = this.previous.indexOf(user_name = who_name);
		//this.previous[this.current].conversation.innerHTML = "";

		add_enter_event();

		//do_amazing_animation('id',t.style.left, t.style.top, t.style.width);
		do_amazing_animation("10vw", "10vh", "30vw", "10vh");

		this.show_conversation_previous(id);
	}
	async show_conversation_previous(id) {
		//console.log(this.conversation[this.current].scroll);
		//console.log(this.conversation[this.current].scrollTop);
		//console.log(this.conversation[this.current].scrollTop.toFixed());

		let row_up = this.previous[this.current].row_up;
		if (row_up <= 0) {
			return;
		}

		let response = await fetch(backEnd.pre + this.who + '/show_conversation' + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'chat_id=' + id + '&row_up=' + row_up});
		let result = await response.json();
		console.log(result);

		if ( !result.length ) {
			this.previous[this.current].row_up = 0;
			return;
		}
		this.previous[this.current].row_up = result[0].chat_media_id - 1;

		let ddd = document.getElementById(`conversation_${this.who}_${id}`).innerHTML;
		document.getElementById(`conversation_${this.who}_${id}`).innerHTML = '';

		let i = 0;
		let r;
		while (r = result[i]) {
			let e;
			let class_media = (r.sender_id == me.user_id) ? "sent" : "received";

			if(r.media_type == 0) {
				let m = decryption(r.text, this.tk.value);
				e = create_div(class_media + " messages", "", "", m);
			} else if(r.media_type == 1) {
				e = create_div(class_media + " images", '', '', '');
				e.append(create_image('', '', '', `data/${this.who}/${id}/${r.chat_media_id}.${r.text}`, Common.w, Common.h));
			} else if(r.media_type == 2) {
				e = create_video(class_media, "", "", "data/" + this.who + "/" + id + "/" + r.id + "." + r.text, Common.w, Common.h);
			}

			document.getElementById(`conversation_${this.who}_${id}`).append(e);
			i++;
		}
		document.getElementById(`conversation_${this.who}_${id}`).innerHTML += ddd;

		document.getElementById(`conversation_${this.who}_${id}`).scrollTop = (innerHeight / 20) * i;
		last_known = (innerHeight / 20) * i;
	}
	on_scroll_event(id) {
		if (document.getElementById(`conversation_${this.who}_${id}`).scrollTop != 0) {
			return;
		}
		if (last_known == 0) {
			return;
		}
		last_known = 0;

		this.show_conversation_previous(id);
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

		let id = this.current;

		let em = encryption(Chats_Groups.tm.value, this.tk.value);

		let response = await fetch(backEnd.pre + this.who + '/send_message' + backEnd.suf, {
			method: 'POST', 
			mode: 'cors', 
			headers: {
				'Content-Type':'application/x-www-form-urlencoded' 
			}, 
			body: 'chat_id=' + id + '&message=' + em
		});
		console.log(response);
		let result = await response.json();

		this.previous[this.current].row_down = result;

		document.getElementById(`conversation_${this.who}_${id}`).appendChild(create_div("sent messages", "", "", Chats_Groups.tm.value));

		document.getElementById(`conversation_${this.who}_${id}`).scrollBy(0, 200);
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
	make_new_call(type) {
		calls.clicked();
		calls.make_new_call(type, this.previous[this.current].user_id, this.previous[this.current].chat_id);
	}
}
