Channels.prototype.add_item_search_new = function(channel_id, {channel_name, title, extension}) {
	let src = ((extension == null) ? this.place_holder : `data/icons/channels/${channel_id}.${extension}`)

	let div = create_div('padding flex col-gap border-b prev', '', '', '')
	let images = create_div('border square images', '', '', '')
	let img = create_image('', '', '', src, '', '')
	// let text = document.createTextNode(`${title}`)
	let text = `<div><div>${title}</div><div class='name'>@${channel_name}</div></div>`
	let join = create_div('flex border button square bg-green add_member', '', `channels.handle_click_join(${channel_id})`, 'join')
	join.setAttribute('data-tooltip', 'join')

	images.appendChild(img)
	div.appendChild(images)
	// div.appendChild(text)
	div.innerHTML += text
	div.appendChild(join)
	return div
	/*this.ls.appendChild(div);*/
}
