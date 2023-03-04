import { fetch_data } from '../../api-client'
import { socket } from '../../socket-client'

export default function(user_id) {
	let member_type_old = this.conv[this.current].members[user_id].member_type
	let value = {
		channel_id: this.current,
		user_id: user_id,
		member_type_old: member_type_old,
		member_type_new: (member_type_old == 2 ? 3 : 2)
	}
	let data = fetch_data('/channels/demote_promote', value)
	socket[this.names].emit('designation-change', value)
	this.update_designation(value)
}
