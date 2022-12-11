Chats.prototype.search = async function() {   //search_previous + search_new
	let q = this.ts.value;
	if (q == "") {
		this.ls.style.display = "none";
		return;
	}
	this.ls.style.display = "block";
    this.ls.innerHTML = ""

    //add banner showing already created chats
	this.ls.appendChild(create_div("flex center border-bottom banner", "", "", "your previous chats"));

	Object.entries(this.previous).forEach(([chat_id, v]) => {
		if ( v.user_name.search(q) != -1 || v.first_name.search(q) != -1 || v.last_name.search(q) != -1) {
			this.add_item_search_previous(chat_id, v);
		}
	})

	let data = await fetchs(`chats/search_new`, {q: q})

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
	this.ls.appendChild(create_div('flex center border-bottom banner', '', '', 'create a new chat'))   //start //create

	create.forEach(v => {
		this.add_item_search_new(v);
		//this.add_item_search_new(`chats.handle_click_create_new(${v.user_id},'${v.user_name}','${v.first_name}','${v.last_name}','${v.extension}')`, 0, v);
	});
	/*
	if (pre.length == 0 && create.length == 0) {
		//SR.innerHTML = "<div class='chat'> no such user found </div>";
		this.ls.appendChild(create_div("prev", "", "", "no such user found"));
	}
	*/
}
