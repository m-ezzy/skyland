Groups.prototype.add_item_media = function(group_id, user_id, group_media_id, media_type, text, time) {
	let text2 = (user_id == me.user_id) ? `${me.first_name} ${me.last_name}` : `${((this.previous[group_id].members)[user_id]).first_name} ${((this.previous[group_id].members)[user_id]).last_name}`;
	let sender = create_div("border-bottom sender_specifier", "", "", text2);
	let time_tag = create_div("time", "", "", time);

	let class_name = (user_id == me.user_id) ? 'sent' : 'received';
	let m = create_div(class_name, '', '', '');

	let e;
	if(media_type == 0) {
		let message = (user_id == me.user_id) ? text : decryption(text, this.tk.value);
		m.classList.add('messages');   //e.className +=  `messages`;
		e = create_div('', '', '', message);
	} else if(media_type == 1) {
		m.classList.add('images');
		e = create_image('', '', '', `data/groups/${group_id}/${group_media_id}.${text}`, '200', '200');
	} else if(media_type == 2) {
		m.classList.add('videos');
		e = create_video('', '', '', '', '200', '200');
	}

	m.appendChild(sender)
	m.appendChild(e)
	m.appendChild(time_tag)
	document.getElementById(`conv_groups_${group_id}`).appendChild(m);

	document.getElementById(`conv_groups_${group_id}`).scrollBy(0, 500);
	/*this.previous[this.current].conversation.scrollBottom();
	/*this.previous[this.current].conversation.scrollTo(0,500);
	(last div tag in message list).scrollIntoView();*/
}
