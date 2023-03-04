import { fetch_data } from '../../api-client'
import { socket } from '../../socket-client'

export default async function() {   //add_member //join
	let conv_id = this.current
	let user_name = this.e.t.add.value
	if(user_name == '') {return}
	this.e.t.add.value = ''

	let { status, user } = await fetch_data(`/groups/add_member`, {conv_id: conv_id, user_name: user_name})
	if(status == 'failure') {return}
	this.add_member(conv_id, user, true)
	socket[this.names].emit('added-member', {
		last_id: this.conv[conv_id].media_down.media_id + 1,
		conv_id: conv_id,
		user_id: user.user_id,
		group: this.conv[conv_id],
		user: user,
	})
}
