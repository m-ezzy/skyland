import { fetch_data } from "../tools"
import { socket } from "../sockets"

export default function() {
	let action = 'leave'
	let value = {
		conv_id: this.current,
		user_id: account.current.user_id,
		member_type: '',
	}
	if(this.names == 'channels') {
		value.member_type = this.conv[value.conv_id].members[value.user_id].member_type
		if(value.member_type == 1) {
			action = 'delete'
		}
	}
	let status = fetch_data(`/${this.names}/${action}`, value)
	socket[this.names].emit('member-left', value)
	this.update_leave(value)
}
