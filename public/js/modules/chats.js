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
	handleClick() {
		super.handleClick();
	}
	async search() {
		let q = Content.ts.value;
		if (q == "") {
			this.sr.style.display = "none";
			return;
		}
		this.sr.innerHTML = "";
		this.sr.style.display = "grid";

		do_amazing_animation("25vw", "0vh", "5vw", "10vh");

		let pre = this.search_previous();

		let response = await fetch(backEnd.pre + "chats/search" + backEnd.suf, {method: "POST", mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'q=' + q});
		let result = await response.json();

		let create = [];
		if (pre.length) {
			result.forEach(r => {
				let match = 0;
				for (let j = 0 ; j < Object.keys(pre).length ; j++) {
					//
					if (pre[j].user_id == r.user_id) {
						match = 1;
						break;
					}
				}
				if (!match) {
					create.push(r);
				}
			});
		} else {
			create = result;
		}

		if (create.length) {
			//add banner showing chats with whom no previous communication
			this.sr.appendChild(create_div('pre', '', '', 'start a new chat'));
		}
		create.forEach(r => {
			let img = document.createElement("img");
			img.src = ((r.extension == null) ? this.place_holder : `data/icons/users/${r.user_id}.${r.extension}`);
			let oc = `chats.create_new(${r.user_id}, '${r.user_name}', '${r.first_name}', '${r.last_name}', '${r.extension}')`;
			let text = `${r.user_id} , ${r.user_name} , ${r.first_name} , ${r.last_name}`;
			let div = create_div('pre', "", oc, text);
			div.appendChild(img);
			this.sr.appendChild(div);
		});
	
		if (pre.length == 0 && create.length == 0) {
			//SR.innerHTML = "<div class='chat'> no such user found </div>";
			this.sr.appendChild(create_div("pre", "", "", "no such user found"));
		}
	}/*
	search_previous() {
		let q = Content.ts.value;
		let pre = {};
			
		Object.entries(this.previous).forEach(([id, v]) => {
			if ( v.user_name.search(q) != -1 || v.first_name.search(q) != -1 || v.last_name.search(q) != -1) {
				pre[id] = v;
			}
		});
		if (Object.keys(pre).length == 0) {
			return pre;
		}
		//add banner showing already created chats
		this.sr.appendChild(create_div("pre", "", "", "your previous chats"));

		Object.entries(pre).forEach(([id, v]) => {
			let img = create_image('', '', '', '', Common.w, Common.h);
			img.src = ((v.extension == null) ? this.place_holder : `data/icons/users/${v.user_id}.${v.extension}`);
			let oc = `chats.take_to_that_conversation(this,${id})`;
			let text = `${id} , ${v.user_id} , ${v.user_name} , ${v.first_name} , ${v.last_name}`;

			let div = create_div('pre', '', oc, text);
			div.appendChild(img);
			chats.sr.appendChild(div);
		});
		return pre;
	}
	async create_new(user_id, user_name, first_name, last_name, extension) {
		this.sr.style.display = 'none';

    	const response = await fetch(backEnd.pre + this.who + "/create_new" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_id2=' + user_id});
    	let data = await response.json();
		console.log(data);

		this.previous[data.chat_id] = {'user_id': user_id, 'user_name': user_name, 'first_name': first_name, 'last_name': last_name, 'extension': extension, 'row_up': 0, 'row_down': data.row_down};

		let img_src = ((extension == 'null') ? this.place_holder : `data/icons/chats/${user_id}.${extension}`);
		let text = `${user_id} , ${user_name} , ${first_name} , ${last_name}`;

		this.new_previous_entry(data.chat_id, text, img_src);

		//let e = document.getElementById(this.who + "_" + data.chat_id);
		//this.conversation.push(e);
		//this.conversation = this.cb.getElementsByClassName('conversation');
		//let y = chats.element.getElementsByClassName("conversation")[chats.previous.length];

		this.show_conversation(this.pl.lastElementChild, data.chat_id);
	}
	async check_for_new() {
		const response = await fetch(backEnd.pre + "chats/check_for_new" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let data = await response.json();

		for(let i=0 ; i<data.length ; i++) {
			let d = data[i];

			let img_src = ((extension == 'null') ? this.place_holder : `data/icons/chats/${d.user_id}.${d.extension}`);
    		let text = `${d.user_id} , ${d.user_name} , ${d.first_name} , ${d.last_name}`;
    		this.new_previous_entry(d.chat_id, text, img_src);
		}
	}*/
	async send_message() {
		await super.send_message();

		let c = this.current;
		let u2 = this.previous[this.current].user_id;
		let m = Chats_Groups.tm.value;

		socket.chats.emit('send-message', {'chat_id': c, 'user_id2': u2, 'message': m});
	}
}

//import { socket } from "../script_messaging.js";
