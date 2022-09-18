chats.add_to_previous = function({chat_id, user_id, user_name, first_name, last_name, extension, row_down}) {
	this.previous[chat_id] = {'user_id': user_id, 'user_name': user_name, 'first_name': first_name, 'last_name': last_name, 'extension': extension, 'row_up': 0, 'row_down': row_down};

	let src = ((extension == 'null') ? this.place_holder : `data/icons/users/${user_id}.${extension}`);
	let text = `cid: ${chat_id} , uid: ${user_id} , un: ${user_name} , fn: ${first_name} , ln: ${last_name}`;

	let prev = create_div('prev', `prev_chats_${chat_id}`, `chats.handle_click_prev(this, ${chat_id})`, text);
	let images = create_div('images', '', '', '');
	let img = create_image('', '', '', src);
	let nmi = create_div('new_media_indicator', `nmi_chats_${chat_id}`, '', '');

	images.appendChild(img);
	prev.appendChild(images);
	prev.appendChild(nmi);
	this.lp.appendChild(prev);

	let conv = create_div('conversation', `conv_chats_${chat_id}`, '', '');
	conv.setAttribute('onscroll', `chats.handle.scroll.conv(${chat_id})`);
	this.bc.appendChild(conv);
	//this.conv.push(this.cb.appendChild(conv));
}
