Chats.prototype.add_item_previous = function(chat_id, {user_id, user_name, first_name, last_name, extension}) {
	let src = ((extension == null) ? this.place_holder : `data/icons/users/${user_id}.${extension}`)

	let prev = create_div('flex wrapper border-bottom prev', `prev_chats_${chat_id}`, `chats.handle_click_prev(${chat_id})`, '')
	let images = create_div('border square images', '', '', '')
	let img = create_image('', '', '', src, "", "")
	//let text = document.createTextNode(`${first_name} ${last_name}`)
	let text = `<div><div>${first_name} ${last_name}</div><div class='trio_name'>@${user_name}</div></div>`
	let nmi = create_div('flex border square new_media_indicator', `nmi_chats_${chat_id}`, '', '')

	images.appendChild(img)
	prev.appendChild(images)
	//prev.appendChild(text)
	prev.innerHTML += text
	prev.appendChild(nmi)
	this.lp.appendChild(prev)
}
