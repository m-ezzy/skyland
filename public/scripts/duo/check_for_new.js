Duo.prototype.check_for_new = async function() {
	let data = await fetchs.chats.check_for_new()

	if(Object.keys(data)) {
		Object.entries(data).forEach(([chat_id, v]) => {
			this.add_item_previous(chat_id, v);
		})
	}
}
