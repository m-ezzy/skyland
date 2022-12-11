Chats.prototype.add_item_search_previous = function(chat_id, {user_id, user_name, first_name, last_name, extension}) {
	let src = ((extension == null) ? this.place_holder : `data/icons/users/${user_id}.${extension}`)

	let div = create_div('flex wrapper border-bottom prev', '', `chats.handle_click_search_previous(${chat_id})`, '')
	let images = create_div('border square images', '', '', '')
	let img = create_image('', '', '', src, '', '')
	let text = document.createTextNode(`${first_name} ${last_name}`)

	images.appendChild(img)
	div.appendChild(images)
	div.appendChild(text)
	this.ls.appendChild(div)
}
