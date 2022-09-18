groups.search_new = async function() {
	let response = await fetch(backEnd.pre + "groups/search_new" + backEnd.suf, {method: "POST", mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'q=' + q});
	let data = await response.json();

	if (data.length) {
		this.ls.appendChild(create_div('prev', '', '', 'send request to join group'));

		data.forEach(v => {
			this.add_to_search(`groups.handle_click_join_request(${v})`, v);
		});
	} else {
		this.ls.appendChild(create_div('prev', '', 'groups.handle_click_create_new()', 'start a new group'));
	}
}
