Groups.prototype.previous_conv = async function() {
	let data = await fetch_data(`${this.names}/previous_conv`, '')

	if (isEmpty(data)) {return}
	// will use Map someday in this.previous
	this.previous = data

	Object.entries(this.previous).forEach(([group_id, v]) => {
		// this.previous[group_id].media = new Map()
		this.add_item_previous(group_id, v)
		this.add_item_conv(group_id)
	})
	socket.groups.emit('join-all-my-rooms', Object.keys(this.previous))
}
