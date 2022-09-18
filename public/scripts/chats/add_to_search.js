chats.add_to_search = function(oc, chat_id, {user_id, user_name, first_name, last_name, extension}) {
	//let oc = prev_or_new == 'prev' ? 'take_to_previous : 'create_new';

	let src = ((extension == null) ? this.place_holder : `data/icons/users/${user_id}.${extension}`);
	let text = `cid: ${chat_id} , uid: ${user_id} , un: ${user_name} , fn: ${first_name} , ln: ${last_name}`;

	let div = create_div('prev', '', oc, text);
	let img = create_image('', '', '', src, '200', '200');
	let images = create_div('images', '', '', '');

	images.appendChild(img);
	div.appendChild(images);
	this.ls.appendChild(div);
}
