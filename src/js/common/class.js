//import {Content} from 'Content.js';

/*export*/
class Common extends Content {
	static media_types = ['images', 'videos', 'audios', 'documents', 'location'];
	static w = Math.floor(innerWidth/5);
	static h = Math.floor(innerHeight/5);

	constructor(who) {
		super(who);
		this.nmi = [];
		this.ch;
		this.scc;
		this.conversation = [];
		//this.ml;

		//this.ml = this.element.getElementsByClassName("messages_list")[0];
	}
	load() {
		super.load();

		let c = "";
		c += "<div class='previous_list'></div>";

		c += "<div class='current_header'>";
			c += "<div></div>";
			c += "<input type='text' class='text search_current_conversation' placeholder='search this conversation' oninput='" + this.who + ".search_current_conversation()'>";
		c += "</div>";

		this.element.innerHTML = c;

		this.pl = this.element.getElementsByClassName("previous_list")[0];
		this.ch = this.element.getElementsByClassName("current_header")[0];
		this.scc = this.element.getElementsByClassName("text search_current_conversation")[0];
	}
	async load_data() {
		super.load_data();
	}
	take_to_that_conversation(t, show_name) {
		Content.sr.style.visibility = "hidden";
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
