Channels.prototype.add_item_member = function(user_id, {user_name, first_name, last_name, extension, member_type}) {
	let src = ((extension == null) ? this.place_holder : `data/icons/users/${user_id}.${extension}`)

	let div = create_div('padding flex col-gap border-b prev', '', `channels.handle_click_member(${user_id})`, '');
	let images = create_div('border square images', '', '', '');
	let img = create_image('', '', '', src, '', '')
	let text = `<div><div>${first_name} ${last_name}</div><div class='name'>@${user_name}</div></div>`
	let desig = create_div(`flex center border designation bg-${member_type}`, '', '', member_type);

	images.appendChild(img)
	div.appendChild(images)
	div.innerHTML += text
	div.appendChild(desig)
	//this.lmem.appendChild(div)

	let num = 0
	if(member_type == 'founder') {
		num = 0
	} else if (member_type == 'manager') {
		num = 1
	} else if (member_type == 'regular') {
		num = 2
	}
	this.lmem.getElementsByClassName('section')[num].appendChild(div)
}
