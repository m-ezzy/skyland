import { fetch_data } from '../../clients/api-client'
import { socket } from '../../clients/socket-client'

export default async function() {
	let conv_id = this.current
	let text = ''
	
	navigator.geolocation.getCurrentPosition((position) => {
		text = position.coords.latitude + 'and' + position.coords.longitude
	})
	if(text = '') {return}

	let data = await fetch_data(`/${this.names}/send_media/message`, {conv_id: conv_id, media_type_id: 6, text: text})

	let value = {
		conv_id: conv_id,
		user_id: account.current.user_id,
		media_id: data.media_id,
		media_type: 'location',
		time_sent: new Date().toLocaleString(),
		text: text
	}
	this.add_media(value)
	socket[this.names].emit('send-media', value)
}
