import { fetch_data } from "../tools"
import { socket } from "../sockets"

export default async function() {   //add_member //join
	let group_id = this.current
	let user_name = this.e.t.add.value
	this.e.t.add.value = ''
	if(user_name == '') {return}

	let { status, user } = await fetch_data(`/groups/add_member`, {group_id: group_id, user_name: user_name})
	if(status == 'failure') {return}

	this.conv[group_id].members[user.user_id] = user
	this.item_member(group_id, user)

	socket[this.names].emit('added-member', {
		last_id: this.conv[group_id].row_down + 1,
		conv_id: group_id,
		user_id: user.user_id,
		user: user,
		group: this.conv[group_id]
	})
}
