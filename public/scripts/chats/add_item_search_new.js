Chats.prototype.add_item_search_new = function(v) {   //{user_id, user_name, first_name, last_name, extension}
	let src = ((v.extension == null) ? this.place_holder : `data/icons/users/${v.user_id}.${v.extension}`)

    let div = create_div('flex wrapper border-bottom prev', '', '', '')
	let images = create_div('border square images', '', '', '')
	let img = create_image('', '', '', src, '', '')
	let text = document.createTextNode(`${v.first_name} ${v.last_name}`)
    let create = create_div("flex button border square green create_new", "", `chats.handle_click_create_new(${v.user_id},'${v.user_name}','${v.first_name}','${v.last_name}','${v.extension}')`, 'create')

	images.appendChild(img)
	div.appendChild(images)
	div.appendChild(text)
	div.appendChild(create)
	this.ls.appendChild(div)
}
