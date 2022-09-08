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
		e = create_div('button add_member', '', 'groups.add_member()', 'add member');
		this.ch.appendChild(e);

		this.tam = this.element.getElementsByClassName('text add_member')[0];
		this.bam = this.element.getElementsByClassName('button add_member')[0];
	}
	load_data() {
		super.load_data();

		socket.groups.emit('join-all-my-rooms', Object.keys(this.previous));
	}
	handleClick() {
		super.handleClick();
	}
	async search() {
		let q = Content.ts.value;
		if(q == "") {
			this.sr.style.display = "none";
			return;
		}
		this.sr.innerHTML = "";
		this.sr.style.display = "grid";
		//search_results_visible();
	
		do_amazing_animation("35vw", "0vh", "5vw", "10vh");

		let group_name_available = 1;

		let pre = this.search_previous();

		const response = await fetch(backEnd.pre + "groups/search" + backEnd.suf, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: "q=" + q});
		let rows = await response.json();
		console.log(rows);

		if (rows == undefined || rows.length == 0) {
			if (group_name_available) {
				this.sr.appendChild(create_div("pre", "", `groups.create_new('${q}')`, "create a new group"));
			}
			return;
		}
		//add banner showing already created chats
		this.sr.appendChild(create_div("pre", "", "", "send request to join new groups"));

		rows.forEach(r => {
			let img = create_image('', '', '', '', Common.w, Common.h);
			img.src = r.extension == 'null' ? this.place_holder : `data/icons/groups/${r.group_id}.${r.extension}`;
			let oc = `groups.send_request_to_join(this, ${r.group_id})`;
			let text = `${r.group_id} , ${r.group_name} , ${r.title}`;

			let div = create_div('pre', '', oc, text);
			div.appendChild(img);
			this.sr.appendChild(div);

			if(r.group_name == q) {
				group_name_available = 0;
			}
		});
	}
	search_previous() {
		let q = Content.ts.value;
		let pre = {};
		
		Object.entries(this.previous).forEach(([id, v]) => {
			if ( v.group_name.search(q) != -1 || v.title.search(q) != -1 ) {
				pre[id] = v;
			}
		});
		if (Object.keys(pre).length == 0) {
			return pre;
		}
		//add banner showing already created chats
		this.sr.appendChild(create_div("pre", "", "", "your previous groups"));

		Object.entries(pre).forEach(([id, v]) => {
			let img = create_image('', '', '', '', Common.w, Common.h);
			img.src = v.extension == 'null' ? this.place_holder : `data/icons/groups/${v.group_id}.${v.extension}`;
			let oc = `groups.take_to_that_conversation(this,${id})`;
			let text = `${id} , ${v.group_name} , ${v.title}`;

			let div = create_div('pre', '', oc, text);
			div.appendChild(img);
			this.sr.appendChild(div);
		});
		return pre;
	}
	async send_request_to_join(group_id) {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				search_results_hidden();
			}
		};
		xhr.open("POST", "../php/" + this.who + "/send_request_to_join.php?q=" + group_id, true);
		xhr.send();
	}
	async add_member() {
		do_amazing_animation("90vw", "0vh", "10vw", "10vh");

		let member = this.tam.value;

		const response = await fetch(backEnd.pre + "groups/add_members" + backEnd.suf, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: `group_id=${this.current}&member=${member}`});
		let data = await response.json();

		this.ch.getElementsByClassName('details')[0].innerHTML += this.tam.value + " , ";
	}
	async create_new(group_name) {
		this.sr.style.display = "none";

		const response = await fetch(backEnd.pre + "groups/create_new" + backEnd.suf, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'group_name=' + group_name});
		let data = await response.json();
		data.value.members[me.user_id] = me;
		this.previous[data.group_id] = data.value;

		this.new_previous_entry(data.group_id, `${data.group_id} , ${group_name} , ${data.title}`, this.place_holder);

		//this.show_conversation(this.pl.lastElementChild, group_id);
	}
}
