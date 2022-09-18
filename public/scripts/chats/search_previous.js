chats.search_previous = function() {
	let q = this.ts.value;
	if (q == "") {
		this.ls.style.display = "none";
		return;
	}
	this.ls.style.display = "grid";

	let prev = {};

	//add banner showing already created chats
	this.ls.appendChild(create_div("prev", "", "", "your previous chats"));

	Object.entries(this.previous).forEach(([chat_id, v]) => {
		if ( v.user_name.search(q) != -1 || v.first_name.search(q) != -1 || v.last_name.search(q) != -1) {
			this.add_to_search(`chats.handle_click_take_to_previous(this, ${chat_id})`, chat_id, v);
		}
	});
};
