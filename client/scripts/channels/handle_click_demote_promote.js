import { fetch_data } from "../tools"
import { socket } from "../sockets"

export default function(user_id, member_type_old) {
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
