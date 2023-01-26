Channels.prototype.add_item_previous = function(channel_id, {channel_name, title, user_id, extension}, section) {
	let src = ((extension == null) ? this.place_holder : `data/icons/channels/${channel_id}.${extension}`)

	let prev = create_div('padding flex col-gap border-b prev', `prev_channels_${channel_id}`, `channels.handle_click_prev(${channel_id})`, '')
	let images = create_div('border square images profile', '', '', '')
	let img = create_image('', '', '', src, '', '')
	//let text = document.createTextNode(title)
	let text = `<div><div>${title}</div><div class='name'>@${channel_name}</div></div>`
	let nmi = create_div('flex center square new_media_indicator', `nmi_channels_${channel_id}`, '', '')

	images.appendChild(img)
	prev.appendChild(images)
	//prev.appendChild(text);
	prev.innerHTML += text
	prev.appendChild(nmi)
	//this.lp.appendChild(prev)
	//return prev
	this.lp.getElementsByClassName('section')[section].appendChild(prev)

	if (this.lp.getElementsByClassName('section')[section].classList.contains('hidden')) {
		this.lp.getElementsByClassName('section')[section].classList.remove('hidden')
	}
}
