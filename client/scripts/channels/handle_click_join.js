import { fetch_data } from "../tools"
import { socket } from "../sockets"

export default async function(conv_id, conv_name, title, extension) {
	this.handle_click_back()
	let { last_id, members } = await fetch_data(`/channels/join`, {conv_id: conv_id})
	socket[this.names].emit('added-member', {
		conv_id: conv_id,
		user: {
			...account.current,
			member_type: 3
		}
	})
	let conv = {
		conv_id: conv_id,
		conv_name: conv_name,
		title: title,
		extension: extension,
	}
	this.item_previous(last_id, conv, members)
	this.item_conv(conv_id)
	members.forEach(member => {
		this.item_member(member)
	})
	await this.handle_click_prev(conv_id)
}
