import { fetch_data } from '../../clients/api-client'
import { socket } from "../../clients/socket-client"

export default function() {
	let value = {
		conv_id: this.current,
		user_id: account.current.user_id,
	}
	let status = fetch_data(`/${this.names}/exit`, value)
	socket[this.names].emit('member-left', value)
	this.on_exit(value)
}
