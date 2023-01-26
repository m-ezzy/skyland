Channels.prototype.previous_conv = async function() {
	let data = await fetch_data(`${this.names}/previous_conv`, '')
	if (data == null) { return }
	this.previous = data

	let section = 0
	//let e
	Object.entries(this.previous).forEach(([channel_id, v]) => {
		if(v.user_id == me.user_id) {
			section = 0
		} else if (v.members[me.user_id].member_type == 'manager') {
			section = 1
		} else {
			section = 2
		}
		this.add_item_previous(channel_id, v, section)
		//e = this.add_item_previous(channel_id, v)
		//this.lp.getElementsByClassName('section')[section].appendChild(e)
	})
	Object.entries(this.previous).forEach(([channel_id, v]) => {
		this.add_item_conv(channel_id)
	})
	socket.channels.emit('join-all-my-rooms', Object.keys(this.previous))
}
