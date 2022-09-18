class Groups extends groups_Groups {
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
		//add banner showing already created s
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
