Groups.prototype.add_item_previous = function(group_id, {conv_name, title, extension}) {
	let nmi = create_div('flex center square new_media_indicator', `nmi_${this.names}_${group_id}`, '', '')
	let div = this.create_item_hero('groups', group_id, conv_name, title, extension, `prev_${this.names}_${group_id}`, `${this.names}.handle_click_prev(${group_id})`)
	div.appendChild(nmi)
	this.lp.appendChild(div)
}
