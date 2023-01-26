Chats.prototype.handle_click_create = async function(user_id, user_name, first_name, last_name, extension) {
	this.ls.classList.add('hidden')
	let { status, chat_id, row_down } = await fetch_data(`chats/create`, {user_id2: user_id})   //`user_id=${user_id}`
	this.previous[chat_id] = {
		conv_name: user_name,
		title: `${first_name} ${last_name}`,

		user_id: user_id,
		user_name: user_name,
		first_name: first_name,
		last_name: last_name,
		extension: extension,
		row_up: 0,
		row_down: row_down
	}
	socket[this.names].emit('created-chat', {
		chat_id: chat_id,
		o: {
			user_id: me.user_id,
			user_name: me.user_name,
			first_name: me.first_name,
			last_name: me.last_name,
			extension: me.extension,
			row_up: 0,
			row_down: row_down
		}
	})
	socket[this.names].emit('join-conv', {chat_id: chat_id})

	this.add_item_previous(chat_id, this.previous[chat_id])
	this.add_item_conv(chat_id)
	await this.handle_click_prev(chat_id)
}
