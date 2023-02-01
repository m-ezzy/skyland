import { fetch_data } from "../tools"
import { socket } from '../sockets'

export default async function() {
	let conv_id = this.current
	let fd = new FormData()
	fd.append('conv_id', conv_id) //`${this.name}_id`
	fd.append('files', this.e.f.files.files[0])
	let data = await fetch_data(`/${this.names}/send_media/files`, fd, true)
	this.e.f.files.value = ''
	console.log(this.e.f, this.e.f.value, this.e.f.files)

	data.forEach(d => {
		let value = {
			conv_id: conv_id,
			user_id: account.current.user_id,
			media_id: d.media_id,
			media_type: d.media_type,
			time_sent: new Date().toLocaleString(),
			text: d.text,
			// ...d
		}
		// this.conv[conv_id].media[data.media_id] = value
		this.item_media(value)
		socket[this.names].emit('send-media', value) // this.socket.emit('send-media', d)
	})
}
