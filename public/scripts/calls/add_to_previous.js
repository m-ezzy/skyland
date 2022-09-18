Calls.prototype.add_to_previous = function({chat_id, caller_id, call_type, time_created, call_length}) {
	let o = chats.previous[chat_id];

	let src = ((o.extension == null) ? this.place_holder : `data/icons/users/${o.user_id}.${o.extension}`);
	let text = `cid: ${chat_id} , uid: ${o.user_id} , un: ${o.user_name} , fn: ${o.first_name} , ln: ${o.last_name}`;
	let in_out = (caller_id == getCookie("user_id")) ? "call_outgoing" : "call_incoming";
	let color = (call_length == 0) ? "call_missed" : "call_accepted";
	let call_type_words = (call_type == 6) ? "audio" : "video";

	let div = create_div("prev", '', '', text);
	let images = create_div("images", '', '', '');
	let img = create_image("", "", "", src);
	let in_out_div = create_div(`called_by ${in_out} ${color}`, '', '', '');
	let button_call = create_div(`button call ${call_type_words}`, '', `calls.make_new_call(${chat_id},${o.user_id},${call_type})`, '');

	images.appendChild(img);
	div.appendChild(images);
	div.appendChild(in_out_div);
	div.appendChild(button_call);
	this.lp.appendChild(div);
}
