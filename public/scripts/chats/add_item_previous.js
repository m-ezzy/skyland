Chats.prototype.add_item_previous = function(chat_id, {user_id, user_name, first_name, last_name, extension}) {
	let nmi = create_div('flex center square new_media_indicator', `nmi_chats_${chat_id}`, '', '')
	let div = this.create_item_hero('users', user_id, user_name, `${first_name} ${last_name}`, extension, `prev_${this.names}_${chat_id}`, `${this.names}.handle_click_prev(${chat_id})`)
	div.appendChild(nmi)
	this.lp.appendChild(div)
}
