Chats.prototype.search_previous = function() {
	let q = Content.ts.value;
	let pre = {};
		
	Object.entries(this.previous).forEach(([id, v]) => {
		if ( v.user_name.search(q) != -1 || v.first_name.search(q) != -1 || v.last_name.search(q) != -1) {
			pre[id] = v;
		}
	});
	if (Object.keys(pre).length == 0) {
		return pre;
	}
	//add banner showing already created chats
    this.sr.appendChild(create_div("pre", "", "", "your previous chats"));

	Object.entries(pre).forEach(([id, v]) => {
		let img = create_image('', '', '', '', Common.w, Common.h);
		img.src = ((v.extension == null) ? this.place_holder : `data/icons/users/${v.user_id}.${v.extension}`);
		let oc = `chats.take_to_that_conversation(this,${id})`;
		let text = `${id} , ${v.user_id} , ${v.user_name} , ${v.first_name} , ${v.last_name}`;

		let div = create_div('pre', '', oc, text);
		div.appendChild(img);
		chats.sr.appendChild(div);
	});
	return pre;
};
