Groups.prototype.add_item_search_previous = function(group_id, {group_name, title, extension}) {
	let src = ((extension == null) ? this.place_holder : `data/icons/groups/${group_id}.${extension}`)

	let div = create_div('flex wrapper border-bottom prev', '', `groups.handle_click_search_previous(${group_id})`, '')
	let images = create_div('border square images', '', '', '')
	let img = create_image('', '', '', src, '', '')
	let text = document.createTextNode(`${title}`)

	images.appendChild(img);
	div.appendChild(images);
	div.appendChild(text);
	this.ls.appendChild(div);
}
