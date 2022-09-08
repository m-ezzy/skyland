class Common extends Content {
	static media_types = ['images', 'videos', 'audios', 'documents', 'location'];
	static w = Math.floor(innerWidth / 5);
	static h = Math.floor(innerHeight / 5);

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

		let response = await fetch(backEnd.pre + this.who + '/load' + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''})
		let result = await response.json();
		console.log(result);

		if ( !(Object.keys(result).length) ) {
			return;
		}
		
		this.previous = result;

		Object.entries(result).forEach(([id, row]) => {
		//for(const row in result) {
			//const { id, text, src } = this.interprete_result_of_load_data(result[i]);

			let path = "data/icons/";
			let text = `${id} , `;

			if (this.who == 'chats') {
				path += "users/";
				text += `${row.user_id} , ${row.user_name} , ${row.first_name} , ${row.last_name}`;
			} else if (this.who == 'groups') {
				path += this.who;
				text += `${row.group_name} , ${row.title}`;
			} else if (this.who == 'channels') {
				path += this.who;
				text += `${row.channel_name} , ${row.title}`;
			}

			if (row.extension == null) {
				path = this.place_holder;
			} else {
				path += (id + "." + row.extension);
			}

			this.new_previous_entry(id, text, path);
		});

		//this.nmi = this.pl.getElementsByClassName('new_media_indicator');
		//this.conversation = this.cb.getElementsByClassName('conversation');

		//this.show_conversation(this.pl.getElementsByTagName('div')[0], result[0].user_name); //this.pl.firstElementChild
		//this.pl.firstElementChild.click();
		//this.current = 0;

		//this.check_for_new_media();
	}
	handleClick() {
		super.handleClick();

		if (this.current != -1) {
			document.getElementById(`conversation_${this.who}_${this.current}`).style.display = 'grid';
		}
	}
	new_previous_entry(id, text, img_src) {
		/*
		let c = "";
		c += "<div class='pre' onclick='" + this.who + ".show_conversation(this," + my_id + ")'";
		c += "<img src='" + path + "' />";
		c += text;
		c += "<div class='new_media_indicator'></div>";
		c += "</div>";
		*/

		let div = create_div('pre', `previous_${this.who}_${id}`, `${this.who}.show_conversation(this, ${id})`, text);
		let img = create_image('', '', '', img_src);
		let nmi = create_div('new_media_indicator', `nmi_${this.who}_${id}`, '', '');
		//div.append(img, nmi);
		div.appendChild(img);
		div.appendChild(nmi);
		this.pl.appendChild(div);

		let conv = create_div('conversation', `conversation_${this.who}_${id}`, '', '');
		conv.setAttribute('onscroll', `${this.who}.on_scroll_event(${id})`);
		this.cb.appendChild(conv);
	}
	take_to_that_conversation(t, id) {
		this.sr.style.display = "none";
		this.show_conversation(t, id);
	}
	async check_for_new_media() {
		if (this.current == -1) {
			return;
		}

		let response = await fetch("src/php/" + this.who + "/check_for_new_media.php", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
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
