Groups.prototype.get_previous = async function() {
	let data = await fetchs(`${this.names}/get_previous`, '')
	this.previous = data.json

	if (this.previous == null) { return }
	Object.entries(this.previous).forEach(([group_id, v]) => {
		this.add_item_previous(group_id, v)
	})
	Object.entries(this.previous).forEach(([group_id, v]) => {
		this.add_item_conv(group_id)
	})
	socket.groups.emit('join-all-my-rooms', Object.keys(this.previous))
}
