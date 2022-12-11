Groups.prototype.search = async function() {
	let q = this.ts.value;
	if (q == "") {
		this.ls.style.display = "none";
		return;
	}
	this.ls.style.display = "block";
    this.ls.innerHTML = ""

	//add banner showing already created groups
	this.ls.appendChild(create_div("flex center border-bottom banner", "", "", "your previous groups"));

	Object.entries(this.previous).forEach(([group_id, v]) => {
		if ( v.group_name.search(q) != -1 || v.title.search(q) != -1) {
			this.add_item_search_previous(group_id, v);
		}
	})

	this.ls.appendChild(create_div("flex center border-bottom banner", "", "", "create a new group"))

	let data = await fetchs(`groups/search_create_new`, {q: q})

	if(data.length == 0) {
		let div = create_div("flex wrapper border-bottom", '', '', '')
		let title = document.createElement("input")
		title.className = "border text title"
		title.type = "text"
		title.placeholder = "type group title here"
		let button = create_div("flex center border square button border-bottom green create_new", '', `groups.handle_click_create_new()`, 'create')

		div.appendChild(title)
		div.appendChild(button)
		this.ls.appendChild(div)
	}
};
