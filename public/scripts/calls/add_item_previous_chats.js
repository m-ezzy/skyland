Calls.prototype.add_item_previous_chats = function({chat_id, user_id, call_type, time_created, call_length}) {
	let o = chats.previous[chat_id];

	let src = ((o.extension == null) ? this.place_holder : `data/icons/users/${o.user_id}.${o.extension}`);
	let text = `${o.first_name} ${o.last_name}`;
	let in_out = (user_id == getCookie("user_id")) ? "call_outgoing" : "call_incoming";
	let color = (call_length == 0) ? "call_missed" : "call_accepted";
	let call_type_words = (call_type == 6) ? "audio" : "video";

	let div = create_div('flex wrapper border-bottom prev', '', '', '');
	let images = create_div('border square images', '', '', '');
	let img = create_image('', '', '', src, 'auto', 'auto');
	let div_text = create_div('', '', '', text);
	let in_out_div = create_div(`called_by ${in_out} ${color}`, '', '', '');
	let button_call = create_div(`button call ${call_type_words}`, '', `calls.make_call_chats(${chat_id},${o.user_id},'${call_type}')`,call_type_words);

	images.appendChild(img);
	div.appendChild(images);
	div.appendChild(div_text);
	div.appendChild(in_out_div);
	div.appendChild(button_call);
	this.lp.appendChild(div);
}
