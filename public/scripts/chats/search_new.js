chats.search_new = async function() {
	let q = this.ts.value;
	if (q == "") {
		this.ls.style.display = "none";
		return;
	}
	this.ls.style.display = "grid";

	do_amazing_animation("25vw", "0vh", "5vw", "10vh");

	let response = await fetch(backEnd.pre + "chats/search_new" + backEnd.suf, {method: "POST", mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'q=' + q});
	let data = await response.json();

	let create = [];
	let user_ids = [];
	Object.values(this.previous).forEach(v => { user_ids.push(v.user_id); });

	if (user_ids.length) {
		data.forEach(d => {
			let match = 0;
			for (let j = 0 ; j < user_ids.length ; j++) {
				if (user_ids[j] == d.user_id) {
					match = 1;
					break;
				}
			}
			if (!match) {
				create.push(d);
			}
		});
	} else {
		create = data;
	}

	//add banner showing chats with whom no previous communication
	this.ls.appendChild(create_div('prev', '', '', 'start a new chat'));

	create.forEach(v => {
		this.add_to_search(`chats.handle_click_create_new(${v.user_id},'${v.user_name}','${v.first_name}','${v.last_name}','${v.extension}')`, 0, v);
	});
	/*
	if (pre.length == 0 && create.length == 0) {
		//SR.innerHTML = "<div class='chat'> no such user found </div>";
		this.ls.appendChild(create_div("prev", "", "", "no such user found"));
	}
	*/
}