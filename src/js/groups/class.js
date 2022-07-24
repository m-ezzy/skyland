class Groups extends Chats_Groups {
	constructor(who) {
		super(who);

		this.tam;
		this.bam;
	}
	load() {
		super.load();

		let e;
		e = create_input_text('text add_member', '', '', '');
		this.ch.appendChild(e);
		e = create_div('button add_member', '', this.who + '.add_member()', 'add member');
		this.ch.appendChild(e);

		this.tam = this.element.getElementsByClassName('text add_member')[0];
		this.bam = this.element.getElementsByClassName('button add_member')[0];
	}
	load_data() {
		super.load_data();
	}
	async search() {
		if(Content.ts.value == "") {
			return;
		}

		Content.sr.innerHTML = "";
		Content.sr.style.visibility = "visible";
		//search_results_visible();
	
		do_amazing_animation("35vw", "0vh", "5vw", "10vh");
	
		const response = await fetch("src/php/" + this.who + "/search.php?q=" + Content.ts.value, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let data = await response.text();

		Content.sr.innerHTML = data;
	}
	async send_request_to_join(group_name) {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				search_results_hidden();
			}
		};
		xhr.open("POST", "../php/" + this.who + "/send_request_to_join.php?q=" + group_name, true);
		xhr.send();
	}
	async add_member() {
		do_amazing_animation("90vw", "0vh", "10vw", "10vh");

		const response = await fetch("src/php/" + this.who + "/add_members.php?gn=" + this.previous[this.current].group_name + "&au=" + this.tam.value, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let data = await response.text();

		this.ch.getElementsByTagName('div')[0].innerHTML += this.tam.value + " , ";
	}
	async create_new(group_name) {
		Content.sr.style.visibility = "hidden";

		const response = await fetch("src/php/" + this.who + "/create_new_group.php", {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'group_name=' + group_name});
		let data = await response.text();

		this.previous.push({group_name: (group_name), extension: "", rows: -1});

		let img = create_image('', '', '', this.place_holder, Common.w, Common.h);
		let div = create_div("new_media_indicator", "", "", "");

		let oc = this.who + ".show_conversation(this, '" + group_name + "')";
		let temp = create_div("chat", "", oc, group_name);

		temp.appendChild(img);
		temp.appendChild(div);
		this.pl.appendChild(temp);

		this.element.appendChild(create_div("conversation", this.who + "_" + group_name, "", ""));
		//let e = document.getElementById(this.who + "_" + user_name);
		//this.conversation.push(e);
		this.conversation = this.element.getElementsByClassName('conversation');
		//let y = chats.element.getElementsByClassName("conversation")[chats.previous.length];

		this.show_conversation(this.pl.lastElementChild, group_name);
	}
	async show_conversation(t, group_name) {
		super.show_conversation(t, group_name);

		do_amazing_animation("10vw", "10vh", "30vw", "10vh");

		this.ch.getElementsByTagName('div')[0].innerHTML += " : ";

		const response = await fetch("src/php/" + this.who + "/get_members.php?gn=" + group_name, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let data = await response.json();

		let r = '';
		data.forEach(d => {
			r += (d.members + " , ");
		});
		this.ch.getElementsByTagName('div')[0].innerHTML += r;
	}
}
