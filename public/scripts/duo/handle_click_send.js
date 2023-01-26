Duo.prototype.handle_click_send = async function() { //message = this.tm.value, key = this.tk.value, chat_id = this.current
	// let conv_id = this.current
	let message = this.tm.value
	let text = null
	let time = new Date().toLocaleString()
	// let key = (this.tk.value == '') ? 0 : this.tk.value
	let key = this.tk.value
	// console.log(key, key == '', key == NaN, key == undefined)

	if (message == '') {return}
	if(key == '') {
		text = message
	} else {
		text = encryption(message, key)
	}

	let data = await fetch_data(`${this.names}/send_media/message`, {conv_id: this.current, text: text}) //encrypted_message //text
	this.previous[this.current].row_down = data.media_id

	let value = {
		conv_id: this.current,
		user_id: me.user_id,
		media_id: data.media_id,
		media_type: "message",
		time: time,
		text: message
	}
	this.previous[this.current].media.push([data.media_id, value])
	this.add_item_media(value, this.names != 'chats')
	socket[this.names].emit('send-media', {...value, text: text})
}
