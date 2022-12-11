Groups.prototype.add_item_member = function(user_id, {user_name, first_name, last_name, extension}) {
	let src = ((extension == null) ? this.place_holder : `data/icons/users/${user_id}.${extension}`);

	let div = create_div('flex wrapper border-bottom prev', '', `groups.handle_click_member(${user_id})`, '');
	let images = create_div('border square images', '', '', '');
	let img = create_image('', '', '', src, '', '')
	let text = `<div><div>${first_name} ${last_name}</div><div class='trio_name'>@${user_name}</div></div>`

	images.appendChild(img);
	div.appendChild(images);
	div.innerHTML += text
	this.lmem.appendChild(div);
}
