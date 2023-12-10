import { fetch_data } from '../../clients/api-client'
import { socket } from '../../clients/socket-client'

export default function() {
	let conv_id = this.current
	let action = 'leave'
	let value = {
		conv_id: this.current,
		user_id: account.current.user_id,
	}
	if(this.names == 'chats') {
		if(this.conv[conv_id].deleted_by) {
			action = 'delete'
		}
	} else if (this.names == 'groups') {
		let num = Object.keys(this.conv[conv_id].members).length
		if(num == 1) {
			action = 'delete'
		}
	} else if (this.names == 'channels') {
		value['member_type'] = this.conv[value.conv_id].members[value.user_id].member_type
		if(value.member_type == 1) {
			action = 'delete'
		}
	}/*
	if(this.names == 'chats') {
		let block = this.conv[this.current].deleted_by ? false : true
		let data = await fetch_data(`/${this.names}/delete`, {chat_id: this.current, block: block})
	}*/
	let status = fetch_data(`/${this.names}/${action}`, value)
	socket[this.names].emit('member-' + action, value)
	// if(action == 'leave') {
		// this.on_leave(value)
	// } else {
		this.on_delete(value)
	// }
}
