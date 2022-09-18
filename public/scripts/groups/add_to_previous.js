groups.add_to_previous = function({group_id, user_id, user_name, first_name, last_name, extension, row_down}) {
	this.previous[group_id] = {'user_id': user_id, 'user_name': user_name, 'first_name': first_name, 'last_name': last_name, 'extension': extension, 'row_up': 0, 'row_down': row_down};

	let text = `cid: ${group_id} , uid: ${user_id} , un: ${user_name} , fn: ${first_name} , ln: ${last_name}`;
	let src = ((extension == null) ? this.place_holder : `data/icons/users/${user_id}.${extension}`);

	let prev = create_div('prev', `prev_groups_${group_id}`, `groups.show_conversation(this, ${group_id})`, text);
	let img = create_image('', '', '', src);
	let nmi = create_div('new_media_indicator', `nmi_groups_${group_id}`, '', '');
	prev.appendChild(img);
	prev.appendChild(nmi);
	this.lp.appendChild(prev);

	let conv = create_div('conversation', `conv_groups_${group_id}`, '', '');
	conv.setAttribute('onscroll', `groups.handle_scroll_conv(${group_id})`);
	this.cb.appendChild(conv);
	//this.conv.push(this.cb.appendChild(conv));
}
