Trio.prototype.handle_change_files = async function() {
	let conv_id = this.current
	let fd = new FormData()
	fd.append(`${this.name}_id`, conv_id)
	fd.append('files', this.input_files.files[0])
	let data = await fetch_data(`${this.names}/send_media/files`, fd, true)

	data.forEach(d => {
		// this.socket.emit('send-media-files', d)
		let value = {
			conv_id: conv_id,
			user_id: me.user_id,
			media_id: d.media_id,
			media_type: d.media_type,
			time: new Date().toLocaleString(),
			text: d.text,
			// ...d
		}
		this.add_item_media(value, this.names != 'chats')
		socket[this.names].emit('send-media', value)
	})
}
