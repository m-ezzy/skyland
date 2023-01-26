Channels.prototype.add_item_search_previous = function(channel_id, {channel_name, title, extension}) {
	let src = ((extension == null) ? this.place_holder : `data/icons/channels/${channel_id}.${extension}`)

	let div = create_div('padding flex col-gap border-b prev', '', `channels.handle_click_search_previous(${channel_id})`, '')
	let images = create_div('border square images', '', '', '')
	let img = create_image('', '', '', src, '', '')
	// let text = document.createTextNode(`${title}`)
	let text = `<div><div>${title}</div><div class='name'>@${channel_name}</div></div>`

	images.appendChild(img)
	div.appendChild(images)
	div.innerHTML += text
	//div.appendChild(text)
	return div
	/* this.ls.appendChild(div) */
}
