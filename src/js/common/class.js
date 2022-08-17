class Common extends Content {
	static media_types = ['images', 'videos', 'audios', 'documents', 'location'];
	static w = Math.floor(innerWidth/5);
	static h = Math.floor(innerHeight/5);

	constructor(who) {
		super(who);
		this.nmi = [];
		this.sc;
		this.conversation = [];
	}
	load() {
		super.load();

		let c = "";
		c += "<input type='text' class='text search_conversation' placeholder='search conversation' oninput='" + this.who + ".search_conversation()'>";
		this.ch.innerHTML += c;

		this.sc = this.element.getElementsByClassName("text search_conversation")[0];
	}
	async load_data() {
		await super.load_data();

		let response = await fetch("src/php/" + this.who + "/load.php", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''})
		let result = await response.json();

		console.log(result, !result);
		if(!result) {
			return;
		}

		this.previous = result;

		let my_id;
		let my_name;
		let path;
		let text;

		let c = "";
		let i = 0;
		result.forEach(r => {
			path = "data/";

			if (this.who == 'chats') {
				my_id = r.chat_id;
				path += "profile_pictures/";
				text = r.user_id + " " + r.user_name + " " + r.first_name + " " + r.last_name;
			} else if (this.who == 'groups') {
				my_id = r.group_id;
				path += this.who + "/icons/";
				text = r.id + " " + r.name + " " + r.title;
			} else if (this.who == 'channels') {
				my_id = r.channel_id;
				path += this.who + "/icons/";
				text = r.id + " " + r.name + " " + r.title;
			}

			if(r.extension == null) {
				path = "media/images/place_holder/" + this.who + ".png";
			} else {
				path += my_id + "." + r.extension;
			}
			
			/*
			c += "<div class='pre' onclick='" + this.who + ".show_conversation(this," + my_id + ")'";
			c += "<img src='" + path + "' />";
			c += text;
			c += "<div class='new_media_indicator'></div>";
			c += "</div>";
			*/

			let div = create_div('pre', '', this.who + ".show_conversation(this," + my_id + ")", text);
			let img = create_image('', '', '', path);
			let nmi = create_div('new_media_indicator', '', '', '');
			div.appendChild(img);
			div.appendChild(nmi);
			this.pl.appendChild(div);

			this.nmi[i] = this.pl.lastElementChild.getElementsByClassName('new_media_indicator')[0];

			let e = create_div('conversation', this.who + '_' + my_id, '', '');
			e.setAttribute('onscroll', this.who + ".on_scroll_event(" + my_id + ")");
			this.cb.appendChild(e);
			
			i++;
		});

		//this.nmi = this.element.getElementsByClassName('new_media_indicator');
		this.conversation = this.cb.getElementsByClassName('conversation');

		//this.show_conversation(this.pl.getElementsByTagName('div')[0], result[0].user_name); //this.pl.firstElementChild
		//this.pl.firstElementChild.click();
		//this.current = 0;

		this.loaded = 1;

		//this.check_for_new_media();
	}
	clicked() {
		super.clicked();

		if (this.current != -1) {
			this.conversation[this.current].style.display = "grid";
		}
	}
	take_to_that_conversation(t, show_name) {
		this.sr.style.display = "none";
		this.show_conversation(t, show_name);
	}
	async check_for_new_media() {
		if (this.current == -1) {
			return;
		}

		let response = await fetch("src/php/" + this.who + "/check_for_new_media.php", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''})
		let result = await response.json();

		for(let i = 0 ; i < this.previous.length ; i++) {
			let w;
			let path;
			let first;
			let second;

			if (this.who == 'chats') {
				w = this.previous[i].user_name;

				first = me.user_name < w ? me.user_name : w;
				second = me.user_name > w ? me.user_name : w;

				path = "chat_between_" + first + "_" + second;
			} else if (this.who == 'groups') {
				w = this.previous[i].group_name;
				path = "group_" + w;
			}

			if (result[w][0] == 0) {
				continue;
			}

			result[w].forEach(r => {
				let e;

				if(r.messages) {
					let m = decryption(r.messages, this.tk.value);
					e = create_div('received messages', '', '', m);
				} else if(r.images) {
					e = create_image('received', "", "", "data/" + this.who + "/" + path + "/" + r.ROWNUM + "." + r.images, Common.w, Common.h);
				} else if(r.videos) {
					e = create_video('received', "", "", "data/" + this.who + "/" + path + "/" + r.ROWNUM + "." + r.videos, Common.w, Common.h);
				}

				this.conversation[i].appendChild(e);
				this.previous[i].rows += 1;
			});

			if (this.current != i) {
				this.nmi[i].style.backgroundColor = 'yellow';
				this.nmi[i].innerHTML = (Number(this.nmi[i].innerText) + result[w].length);
			}
			this.conversation[i].scrollBy(0,500);

			/*this.previous[this.current].conversation.scrollBottom();
			/*this.previous[this.current].conversation.scrollTo(0,500);
			(last div tag in message list).scrollIntoView();*/
		}

		/*if (resources) {
			// set timeot not working, caused a lot of trouble
			cfnm = setTimeout(chats.check_for_new_media, 5000);
		}*/
		//});
	}
	search_messages() {
	}
}
