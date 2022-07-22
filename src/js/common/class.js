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
	take_to_that_conversation(t, show_name) {
		this.sr.style.visibility = "hidden";
		this.show_conversation(t, show_name);
	}
	async check_for_new_media() {
		/*if(this.tk.value == "") {
			return;
		}*/
		//let RN = <?php echo $_SESSION['RowNumber']?>;

		if (this.current == -1) {
			return;
		}

		let response = await fetch("src/php/" + 'chats' + "/check_for_new_media.php", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''})
		//let result = await response.json();
		.then(response => response.json())
		.then(result => {

		console.log('8888888888888888888888888888888');
		console.log(result);

		/*if(result == "") {
			return;
		}*/
		console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
		console.log(this.previous);
		console.log(this.sr);

		for(let i = 0 ; i < this.previous.length ; i++) {
			let u2 = this.previous[i].user_name;
			console.log('ggggggggggggggggggggggggggggggggggggggggggggggg');
			console.log(result[u2]);

			//if(result[i]) {
			if (result[u2][0] == 0) {
				continue;
			}

			let first;
			let second;
			let path;

			if (this.who == 'chats') {
				first = me.user_name < this.previous[i].user_name ? me.user_name : this.previous[i].user_name;
				second = me.user_name > this.previous[i].user_name ? me.user_name : this.previous[i].user_name;

				path = "chat_between_" + first + "_" + second;
			} else if (this.who == 'groups') {
				path = "group_" + "something_here";
			}

			result[u2].forEach(r => {
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

			this.nmi[i].style.backgroundColor = 'yellow';
			this.nmi[i].innerHTML = result[u2].length;
			this.conversation[i].scrollBy(0,500);

			/*this.previous[this.current].conversation.scrollBottom();
			/*this.previous[this.current].conversation.scrollTo(0,500);
			(last div tag in message list).scrollIntoView();*/
		}

		/*if (resources) {
			// set timeot not working, caused a lot of trouble
			cfnm = setTimeout(chats.check_for_new_media, 5000);
		}*/
		});
	}
}
