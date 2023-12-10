import { fetch_data } from '../../clients/api-client'
import { socket } from '../../clients/socket-client'

export default async function(conv_id, conv_name, title, extension, user_id) {
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
		user_id: user_id,
	}
	this.add_prev(last_id, conv, members)
	/*
	members.forEach(member => {
		this.add_member(conv_id, member)
	})*/
	await this.handle_click_prev(conv_id)
}
