groups.search_previous = function() {
	let q = this.ts.value;
	if (q == "") {
		this.ls.style.display = "none";
		return;
	}
	this.ls.style.display = "grid";

	let prev = {};

	//add banner showing already created groups
	this.ls.appendChild(create_div("prev", "", "", "your previous groups"));

	Object.entries(this.previous).forEach(([group_id, v]) => {
		if ( v.group_name.search(q) != -1 || v.title.search(q) != -1) {
			this.add_to_search(`groups.handle_click_take_to_previous(this, ${group_id})`, v);
		}
	});
};
