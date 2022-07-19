class Content {
	static menus = ['home', 'chats', 'groups', 'channels', 'games', 'market'];
	static current;

	constructor(who) {
		this.who = who;
		this.element = document.getElementById(this.who);
		this.innerHTML = "";
		this.loaded_already = 0;
		this.open = 0;
		this.current = 0;
		this.previous = [];

		this.place_holder =  "../../media/images/place_holder_" + this.who + ".png";

		this.bb;
		this.ts;
		this.bs;
		this.sr;
		this.pl;
	}
	hide_search_results() {
		this.sr.style.visibility = "hidden";
	}
	show_search_results() {
		this.sr.style.visibility = "visible";
	}
}
class Home extends Content {
	constructor(who) {
		super(who);

		this.ud;

		this.load();
	}
	async load() {
		let response = await fetch("../php/" + this.who + "/load.php", {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let result = await response.json();

		let h;
		h = "<div class='button back' onclick='" + this.who + ".hide_search_results()'> back </div>";
		h += "<input type='text' class='text search' placeholder='search everything' onfocus='" + this.who + ".show_search_results()' oninput='" + this.who + ".search()'>";
		h += "<div class='button search' onclick='" + this.who + ".search()'> search </div>";

		h += "<div class='search_results'></div>";
		h += "<div class='previous_list' id='my_profile'>";

		if(result.extension) {
			h += "<img src='../../data/profile_pictures/" + result.user_name + "." + result.extension + "' id='profile_picture'>";
		} else {
			h += "<input type='file' name='file_pp' id='file_pp'>";
			h += "<input type='button' value='upload picture to server' id='button_pp' onclick='home.upload_profile_picture()'>";
		}

		h += "<br>" + result.user_name + "<br>" + result.first_name + "<br>" + result.last_name;
		h += "</div>";
		h += "<div class='updates'></div>";
		h += "<div class='updates'></div>";
		h += "<div class='updates'></div>";
		h += "<div class='updates'></div>";
		h += "<div class='updates'></div>";
		this.element.innerHTML = h;
		
		me = result;

		this.sr = this.element.getElementsByClassName('search_results')[0];
		this.pl = this.element.getElementsByClassName('previous_list')[0];
		this.ud = this.element.getElementsByClassName('updates');
	}
	upload_profile_picture() {
		let xhr = new XMLHttpRequest();
	
		let file = document.getElementById('file_pp').files[0];

		let fd = new FormData();
		fd.append("file_pp", file);
	
		xhr.open("POST", "../php/home/upload_profile_picture.php", true);
		//xhr.setRequestHeader("Content-type","image");
		xhr.send(fd);
	
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				this.pl.removeChild(document.getElementById("file_pp"));
				this.pl.removeChild(document.getElementById("button_pp"));

				this.pl.innerHTML = "<img src='../../data/profile_pictures/" + me.user_name + "." + this.responseText + "' id='profile_picture'>";
				me.extension = this.responseText;
			}
		};
	}
}
//import {Content} from 'Content.js';

/*export*/ class Common extends Content {
	static media_types = ['images', 'videos', 'audios', 'documents', 'location'];
	static w = Math.floor(innerWidth/5);
	static h = Math.floor(innerHeight/5);

	constructor(who) {
		super(who);
		this.ch;
		this.scc;
		this.conversation = [];
		//this.ml;

		//this.ml = this.element.getElementsByClassName("messages_list")[0];
	}
	take_to_that_conversation(t, user_name) {
		this.sr.style.visibility = "hidden";
		this.show_conversation(t, user_name);
	}
	async check_for_new_media() {
		/*if(this.tk.value == "") {
			return;
		}*/
		//let RN = <?php echo $_SESSION['RowNumber']?>;

		let response = await fetch("../php/" + 'chats' + "/check_for_new_media.php", {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let result = await response.json();

		console.log('8888888888888888888888888888888');
		console.log(result);

		/*if(result == "") {
			return;
		}*/
		
		for (let i = 0 ; i < result.length ; i++) {
			console.log(result[0]);
			if (result[i] == 0) {
				break;
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

			result[i].forEach(r => {
				let e;

				if(r.messages) {
					let m = decryption(r.messages, this.tk.value);
					e = create_div('received messages', '', '', m);
				} else if(r.images) {
					e = create_image('received', "", "", "../../data/" + this.who + "/" + path + "/" + r.ROWNUM + "." + r.images, Common.w, Common.h);
				} else if(r.videos) {
					e = create_video('received', "", "", "../../data/" + this.who + "/" + path + "/" + r.ROWNUM + "." + r.videos, Common.w, Common.h);
				}

				this.previous[i].conversation.appendChild(e);
				this.previous[i].rows += 1;
			});
			this.previous[i].conversation.scrollBy(0,500);
			this.pl.getElementsByTagName('div')[i].style.backgroundColor = "red";
			/*this.previous[this.current].conversation.scrollBottom();
			/*this.previous[this.current].conversation.scrollTo(0,500);
			(last div tag in message list).scrollIntoView();*/
		}

		if (resources) {
			let ci = setTimeout(this.check_for_new_media, 5000);
		}
	}
}
//import {Common} from 'Common.js';

/*export*/ class ChatsGroups extends Common {
	constructor(who) {
		super(who);

		this.tk;
		this.bed;

		this.sending;
		this.snm;

		this.bi;
		this.bv;
		this.ba;
		this.bd;
		this.bl;

		this.tm;
		this.bm;

		let c;
		c = "<div class='button back' onclick='" + this.who + ".hide_search_results()'> back </div>";
		c += "<input type='text' class='text search' placeholder='type here to search' onfocus='" + this.who + ".show_search_results()' oninput='" + this.who + ".search()'>";
		c += "<div class='button search' onclick='" + this.who + ".search()'> search </div>";

		c += "<div class='search_results'></div>";
		c += "<div class='previous_list'></div>";

		c += "<div class='current_header'>";
			c += "<div></div>";
			c += "<input type='text' class='text search_current_conversation' placeholder='search this conversation' oninput='" + this.who + ".search_current_conversation()'>";
			c += "<input type='text' class='text key' placeholder='enter key of this conversation' value='0' oninput='" + this.who + ".show_decrypted_media()'>";
			c += "<div class='button key' onclick='" + this.who + ".e_d()'> encrypt / decrypt </div>";
		c += "</div>";

		c += "<div class='send_new_media'>";
			//<!--<label for='file'> image </label>-->

			c += "<div class='button images' onclick='" + this.who + ".select_images()'> images </div>";
			c += "<div class='button videos' onclick='" + this.who + ".select_videos()'> videos </div>";
			c += "<div class='button audios' onclick='" + this.who + ".select_audios()'> audios </div>";
			c += "<div class='button documents' onclick='" + this.who + ".select_documents()'> documents </div>";
			c += "<div class='button location' onclick='" + this.who + ".select_location()'> location </div>";

			c += "<input class='text message' type='text' placeholder='type a new message' onfocus='add_enter_event()' onblur='remove_enter_event()'>";
			c += "<div class='button message' onclick='" + this.who + ".send_message()'> send </div>";
		c += "</div>";
		this.element.innerHTML = c;

		this.bb = this.element.getElementsByClassName("button back")[0];
		this.ts = this.element.getElementsByClassName("text search")[0];
		this.bs = this.element.getElementsByClassName("button search")[0];
		this.sr = this.element.getElementsByClassName("search_results")[0];
		this.pl = this.element.getElementsByClassName("previous_list")[0];

		this.ch = this.element.getElementsByClassName("current_header")[0];

		this.scc = this.element.getElementsByClassName("text search_current_conversation")[0];
		this.tk = this.element.getElementsByClassName("text key")[0];
		this.bed = this.element.getElementsByClassName("button e_d")[0];

		this.sending = document.getElementsByClassName("sending");

		this.snm = document.getElementsByClassName("send_new_media")[0];

		this.bi = document.getElementsByClassName("button " + Common.media_types[0])[0];
		this.bv = document.getElementsByClassName("button " + Common.media_types[1])[0];
		this.ba = document.getElementsByClassName("button " + Common.media_types[2])[0];
		this.bd = document.getElementsByClassName("button " + Common.media_types[3])[0];
		this.bl = document.getElementsByClassName("button " + Common.media_types[4])[0];

		this.tm = document.getElementsByClassName("text message")[0];
		this.bm = document.getElementsByClassName("button message")[0];

		this.load();
	}
	async load() {
		let response = await fetch("../php/" + this.who + "/load.php", {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		//.then(response => response.json())
		//.then(result => {

		let result = await response.json();
		console.log(result);

		let my_name;
		let path;
		let text;

		let i = 0;
		result.forEach(r => {
			if (this.who == 'chats') {
				my_name = r.user_name;
				path = "../../data/profile_pictures/";
				text = r.user_name + " " + r.first_name + " " + r.last_name;
			} else if (this.who == 'groups') {
				my_name = r.group_name;
				path = "../../data/" + this.who + "/profile_pictures/";
				text = r.group_name + " " + r.display_name;
			}

			if(r.extension == null) {
				path = "../../media/images/place_holder_" + this.who + ".png";
			} else {
				path += my_name + "." + r.extension;
			}
			
			let div = create_div("", "", this.who + ".show_conversation(this,'" + my_name + "')", text);
			let img = create_image("", "", "", path);
			div.appendChild(img);
			this.pl.appendChild(div);

			let e = create_div('conversation', this.who + '_' + my_name, '', '');
			this.element.appendChild(e);

			if (this.who == 'chats') {
				this.previous.push({user_name: (r.user_name), first_name: (r.first_name), last_name: (r.last_name), extension: (r.extension), rows: -1});
			} else if (this.who == 'groups') {
				this.previous.push({group_name: (r.group_name), display_name: (r.display_name), extension: (r.extension), rows: -1});
			}
			
			i++;
		});

		this.conversation = this.element.getElementsByClassName('conversation');

		//this.show_conversation(this.pl.firstElementChild, result[0].group_name);
		this.current = 0;
		//this.pl.firstElementChild.click();

		//this.check_for_new_media();
	}
	//can't use 'this' in function parameters, using 't' instead of 'this'
	async show_conversation(t, who_name) {
			console.log("1" + this.current);
			console.log(this.conversation);
			this.conversation[this.current].style.visibility = "hidden";

		if (this.who == 'chats') {
			this.current = this.previous.findIndex(u => u.user_name == who_name);
			console.log(this.current);
		} else if (this.who == 'groups') {
			this.current = this.previous.findIndex(g => g.group_name == who_name);
		}

		this.ch.getElementsByTagName('div')[0].innerHTML = t.innerHTML;
		this.conversation[this.current].style.visibility = "visible";

		if (this.previous[this.current].rows != -1) {
			return;
		}
	
		//this.current = this.previous.indexOf(user_name = who_name);
		//this.previous[this.current].conversation.innerHTML = "";

		//do_amazing_animation('id',t.style.left, t.style.top, t.style.width);
		do_amazing_animation("10vw", "10vh", "30vw", "10vh");
	
		let response = await fetch("../php/" + this.who + "/show_conversation.php?q=" + who_name, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let result = await response.json();

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

		let i = 0;
		let r;
		//result.forEach(r => {
		while (r = result[i]) {
			let e;
			let class_media = ((r.sent_by == me.user_name) ? "sent" : "received");

			if(r.messages) {
				let m = decryption(r.messages, this.tk.value);
				e = create_div(class_media + " messages", "", "", m);
			} else if(r.images) {
				e = create_image(class_media, "", "", "../../data/" + this.who + "/" + path + "/" + r.ROWNUM + "." + r.images, Common.w, Common.h);
			} else if(r.videos) {
				e = create_video(class_media, "", "", "../../data/" + this.who + "/" + path + "/" + r.ROWNUM + "." + r.videos, Common.w, Common.h);
			}

			console.log(e);

			this.conversation[this.current].append(e);
			i++;
			//let mlh = this.previous[this.current].conversation.style.height;
			this.conversation[this.current].scrollTo(0,99999);

			//MS = document.getElementsByClassName("sent messages");
			//MR = document.getElementsByClassName("received messages");

			/*
			if(resources) {
				let ci = setInterval(check_for_new_messages, 1000);
		
			}*/
		}
		//});
		this.previous[this.current].rows = i;
	}
	async send_message() {
		if(this.tm.value == "" || this.tk.value == "") {
			return;
		}

		do_amazing_animation_z("55vw", "0vh", 7, "5vw", "10vh");

		let em = encryption(this.tm.value, this.tk.value);

		let response = await fetch("../php/" + this.who + "/send_message.php?q=" + em + "&uu=" + this.previous[this.current].user_name, {
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

		this.conversation[this.current].appendChild(create_div("sent messages", "", "", this.tm.value));
		this.conversation[this.current].scrollBy(0,100);
	}
	async send_images() {
		this.sending[0].style.visibility = "hidden";

		const fd = new FormData();
		let all_files = document.getElementsByClassName("select_images")[0];
		fd.append("select_images", all_files.files[0]);

		let text;
		let response = await fetch("../php/" + this.who + "/send_images.php?q=" + this.previous[this.current].user_name, {
			method: 'POST',
			body: fd
		})
		.then((response) => response.text())
		.then((value) => {
			text = value;
		});
		//console.log(result);

		let w = Math.floor(innerWidth/5);
		let h = Math.floor(innerHeight/5);

		this.conversation[this.current].appendChild(create_image("sent", "", "", "../../data/" + this.who + "/" + text, w, h));
		this.previous[this.current].rows += 1;
		this.conversation[this.current].scrollBy(0,100);
	}
	async send_videos() {
		document.getElementsByClassName("sending")[1].style.visibility = "hidden";
	
		let xhr = new XMLHttpRequest();
		//let file = document.getElementById('select_videos').files[0];
		let file = this.element.getElementsByClassName("select_videos")[0].files[0];
	
		let fd = new FormData();
		fd.append("select_videos", file);
	
		xhr.open("POST", "../php/this/send_videos.php", true);
		//xhr.setRequestHeader("Content-type","image");
		xhr.send(fd);
	
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				let w = Math.floor(innerWidth/5);
				let h = Math.floor(innerHeight/5);
				this.previous[this.current].conversation.appendChild(create_video("sent", "", "", "../../data/this/chat_between_" + this.responseText, w, h));
				this.previous[this.current].rows += 1;
				this.previous[this.current].conversation.scrollBy(0,100);
			}
		};
	}
	select_images() {
		//document.getElementById("select_images").click();
		this.sending[0].getElementsByClassName("select_images")[0].click();
		document.getElementsByClassName("sending")[0].style.visibility = "visible";
	}
	select_videos() {
		//document.getElementById("select_videos").click();
		this.element.getElementsByClassName("select_videos")[0].click();
		document.getElementsByClassName("sending")[1].style.visibility = "visible";
	}
	select_audios() {
		//document.getElementById("select_audios").click();
		this.element.getElementsByClassName("select_audios")[0].click();
		document.getElementsByClassName("sending")[2].style.visibility = "visible";
	}
	select_documents() {
		//document.getElementById("select_documents").click();
		this.element.getElementsByClassName("select_documents")[0].click();
		document.getElementsByClassName("sending")[3].style.visibility = "visible";
	}
	select_location() {
		//document.getElementById("select_location").click();
		this.element.getElementsByClassName("select_location")[0].click();
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
//import {ChatsGroups} from 'ChatsGroups.js';

class Chats extends ChatsGroups {
	constructor(who) {
		super(who);
	}
	async search() {
		let s = this.ts.value;
		if(s == "") {
			console.log(s + "23");
			return;
		}
		console.log(s);
	
		do_amazing_animation("35vw", "0vh", "5vw", "10vh");

		this.sr.innerHTML = "";
		this.sr.style.visibility = "visible";
	
		let pre = [];
		for (let i=0 ; i<this.previous.length ; i++) {
			let un = this.previous[i].user_name.search(s);
			let fn = this.previous[i].first_name.search(s);
			let ln = this.previous[i].last_name.search(s);
	
			console.log(un + fn + ln);
	
			if (un != -1 || fn != -1 || ln != -1) {
				pre.push(this.previous[i]);
			}
		}
		if (pre.length) {
			//add banner showing already created chats
			this.sr.appendChild(create_div("chat", "", "", "your previous " + this.who));
		}
		for (let i = 0 ; i < pre.length ; i++) {
			let img = document.createElement("img");
			img.src = pre[i].extension ? "../../data/profile_pictures/" + pre[i].user_name + "." + pre[i].extension : this.place_holder;

			let oc = this.who + ".take_to_that_conversation(this,'" + pre[i].user_name + "')";
			let text = pre[i].user_name + " " + pre[i].first_name + " " + pre[i].last_name;
			let temp = create_div("chat", "", oc, text);
	
			temp.appendChild(img);
			this.sr.appendChild(temp);
		}
	
		console.log("503");
		console.log(s);
	
		do_amazing_animation("25vw", "0vh", "5vw", "10vh");
	
		let response = await fetch("../php/" + this.who + "/search.php?q=" + s, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let result = await response.json();
	
		if (result.length) {
			//add banner showing chats with whom no previous communication
			this.sr.appendChild(create_div("chat", "", "", "start a new chat"));
		}
		result.forEach(r => {
			let img = document.createElement("img");
			img.src = r.extension ? "../../data/profile_pictures/" + r.user_name + "." + r.extension : this.place_holder;
	
			let oc = "chats.create_new('" + r.user_name + "','" + r.first_name + "','" + r.last_name + "','" + r.extension + "')";
			let text = r.user_name + " " + r.first_name + " " + r.last_name;
			let temp = create_div("chat", "", oc, text);
			//temp.onclick = oc;

			temp.appendChild(img);
			this.sr.appendChild(temp);
		});

		if (pre.length == 0 && result.length == 0) {
			//SR.innerHTML = "<div class='chat'> no such user found </div>";
			this.sr.appendChild(create_div("chat", "", "", "no such user found"));
		}
	}
	async create_new(user_name, first_name, last_name, extension) {
		this.sr.style.visibility = "hidden";

		const response = await fetch("../php/" + this.who + "/create_new.php", {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_name=' + user_name});
		let data = response.json();

		this.previous.push({user_name: (user_name), first_name: (first_name), last_name: (last_name), extension: (extension), rows: -1});
		this.element.appendChild(create_div("conversation", this.who + "_" + user_name, "", ""));
		let e = document.getElementById(this.who + "_" + user_name);
		//this.conversation.push(e);
		this.conversation = this.element.getElementsByClassName('conversation');
		//let y = chats.element.getElementsByClassName("conversation")[chats.previous.length];

		let img = document.createElement("img");
		img.src = extension != 'null' ? "../../data/profile_pictures/" + user_name + "." + extension : this.place_holder;

		let oc = this.who + ".show_conversation(this, '" + user_name + "')";
		let text = user_name + " " + first_name + " " + last_name;
		let temp = create_div("chat", "", oc, text);

		temp.appendChild(img);
		this.pl.appendChild(temp);

		this.show_conversation(this.pl.lastElementChild, user_name);
	}
}
class Groups extends ChatsGroups {
	constructor(who) {
		super(who);

		this.tam;
		this.bam;
	}
	async search() {
		if(this.ts.value == "") {
			return;
		}
		//search_results_visible();
	
		do_amazing_animation("35vw", "0vh", "5vw", "10vh");
	
		const response = await fetch("../php/" + this.who + "/search.php?q=" + this.ts.value, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let data = response.json();

		this.sr.innerHTML = data;
	}
}
class Games extends Content {
	constructor(who) {
		super(who);
	}
}
class Market extends Content {
	constructor(who) {
		super(who);
	}
}
