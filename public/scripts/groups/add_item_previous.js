Groups.prototype.add_item_previous = function(group_id, {group_name, title, extension}) {
	let src = ((extension == null) ? this.place_holder : `data/icons/groups/${group_id}.${extension}`)

	let prev = create_div('flex wrapper border-bottom prev', `prev_groups_${group_id}`, `groups.handle_click_prev(${group_id})`, '')
	let images = create_div('border square images', '', '', '')
	let img = create_image('', '', '', src, '', '')
	//let text = document.createTextNode(title)
	let text = `<div><div>${title}</div><div class='trio_name'>@${group_name}</div></div>`
	let nmi = create_div('flex border square new_media_indicator', `nmi_groups_${group_id}`, '', '')

	images.appendChild(img)
	prev.appendChild(images)
	//prev.appendChild(text);
	prev.innerHTML += text
	prev.appendChild(nmi)
	this.lp.appendChild(prev)
}
