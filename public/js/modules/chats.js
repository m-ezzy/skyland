class Chats extends Chats_Groups {
	constructor(who) {
		super(who);
		//this.who == 'chats'; you dont need to pass it in constructor who they are. we know who they are
	}
	load() {
		super.load();
	}
	async load_data() {
		await super.load_data();

		/*
		let testArray = ["Shirt", "Bottom", "Shoes"];
		window.sessionStorage.setItem("items", JSON.stringify(testArray));
		var storedArray = JSON.parse(sessionStorage.getItem("items"));//no brackets
		var i;
		for (i = 0; i < storedArray.length; i++) {
            alert(storedArray[i]);
		}
		*/

		let chat_ids = [];
		chat_ids = Object.keys(this.previous);
		console.log(chat_ids);
		socket.chats.emit('join-all-my-rooms', chat_ids);
	}
	clicked() {
		super.clicked();
	}
	async search() {
		let s = Content.ts.value;
		if (s == "") {
			this.sr.style.display = "none";
			return;
		}
		this.sr.innerHTML = '';
		this.sr.style.display = 'grid';

		do_amazing_animation("25vw", "0vh", "5vw", "10vh");

		let pre = this.search_previous();

		let response = await fetch(backEnd.pre + this.who + '/search' + backEnd.suf, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'q=' + s});
		let result = await response.json();

		let create = [];
		if (pre.length) {
			for (let i = 0 ; i < result.length ; i++) {
				let match = 0;
				for (let j = 0 ; j < pre.length ; j++) {
					if (pre[j].user_id == result[i].user_id) {
						
						match = 1;
						break;
					}
				}
				if (!match) {
					create.push(result[i]);
				}
			}
		} else {
			create = result;
		}

		if (create.length) {
			//add banner showing chats with whom no previous communication
			this.sr.appendChild(create_div('pre', '', '', 'start a new ' + this.who));
		}
		create.forEach(r => {
			let img = document.createElement("img");
			img.src = r.extension ? "../data/profile_pictures/" + r.user_name + "." + r.extension : this.place_holder;

			let oc = this.who + ".create_new(" + r.user_id + ",'" + r.user_name + "','" + r.first_name + "','" + r.last_name + "','" + r.extension + "')";
			let text = r.user_name + " " + r.first_name + " " + r.last_name;
			let temp = create_div('pre', "", oc, text);
			//temp.onclick = oc;

			temp.appendChild(img);
			this.sr.appendChild(temp);
		});
	
		if (pre.length == 0 && create.length == 0) {
			//SR.innerHTML = "<div class='chat'> no such user found </div>";
			this.sr.appendChild(create_div("pre", "", "", "no such user found"));
		}
	}
	search_previous() {
		let s = Content.ts.value;

		let pre = [];
		for (let i=0 ; i<this.previous.length ; i++) {
			let un = this.previous[i].user_name.search(s);
			let fn = this.previous[i].first_name.search(s);
			let ln = this.previous[i].last_name.search(s);

			if (un != -1 || fn != -1 || ln != -1) {
				pre.push(this.previous[i]);
			}
		}
		if (pre.length) {
			//add banner showing already created chats
			this.sr.appendChild(create_div("pre", "", "", "your previous " + this.who));
		}
		for (let i = 0 ; i < pre.length ; i++) {
			let img = document.createElement("img");
			img.src = pre[i].extension ? "../data/profile_pictures/" + pre[i].user_id + "." + pre[i].extension : this.place_holder;

			let oc = this.who + ".take_to_that_conversation(this,'" + pre[i].user_id + "')";
			let text = pre[i].user_name + " " + pre[i].first_name + " " + pre[i].last_name;
			let temp = create_div('pre', '', oc, text);

			temp.appendChild(img);
			this.sr.appendChild(temp);
		}

		return pre;
	}
	async create_new(user_id, user_name, first_name, last_name, extension) {
		this.sr.style.display = 'none';

		const response = await fetch(backEnd.pre + this.who + "/create_new" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_id2=' + user_id});
		let data = await response.json();

		console.log(data);

		this.previous[data.chat_id] = {user_id: user_id, user_name: user_name, first_name: first_name, last_name: last_name, extension: extension, row_up: 0, row_down: data.row_down};

		let src = extension != 'null' ? "data/profile_pictures/" + user_id + "." + extension : this.place_holder;
		let text = user_id + ' ' + user_name + ' ' + first_name + ' ' + last_name;

		this.new_previous_entry(data.chat_id, text, src);

		//let e = document.getElementById(this.who + "_" + data.chat_id);
		//this.conversation.push(e);
		this.conversation = this.cb.getElementsByClassName('conversation');
		//let y = chats.element.getElementsByClassName("conversation")[chats.previous.length];

		this.show_conversation(this.pl.lastElementChild, data.chat_id);
	}
	async check_for_new() {
		if (this.loaded == 0) {
			return;
		}

		const response = await fetch("src/php/" + this.who + "/check_for_new.php", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let data = await response.json();

		if (data[0] == 0) {
			return;
		}

		this.create_new(data.user_id, data.user_name, data.first_name, data.last_name, data.extension);
	}
	async send_message() {
		await super.send_message();

		let c = this.current;
		let u2 = this.previous[this.current].user_id;
		let m = Chats_Groups.tm.value;

		socket.chats.emit('send-message', {'chat_id': c, 'user_id2': u2, 'message': m});
	}
}

//import { socket } from "../script_messaging.js";
