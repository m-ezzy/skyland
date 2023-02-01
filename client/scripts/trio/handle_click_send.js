import { encryption } from '../privacy'
import { fetch_data } from "../tools"
import { socket } from '../sockets'

export default async function() { //message = this.tm.value, key = this.tk.value, chat_id = this.current
	let conv_id = this.current
	let message = this.e.t.msg.value
	let text = message

	if (message == '') {return}
	if(this.names != 'channels') {
		let key = this.e.t.key.value
		text = encryption(message, key)
	}
	let data = await fetch_data(`/${this.names}/send_media/message`, {conv_id: conv_id, text: text}) //encrypted_message //text
	this.e.t.msg.value = ''

	let value = {
		conv_id: conv_id,
		user_id: account.current.user_id,
		media_id: data.media_id,
		media_type: "message",
		time_sent: new Date().toLocaleString(),
		text: text
	}
	// this.media.get(conv_id).set(data.media_id, value)
	// this.conv[conv_id].media[data.media_id] = value
	this.item_media(value) // this.item_media(value, this.names != 'chats')
	socket[this.names].emit('send-media', value)
}
