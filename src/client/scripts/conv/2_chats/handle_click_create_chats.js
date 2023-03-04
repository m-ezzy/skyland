import { fetch_data } from '../../api-client'
import { socket } from "../../socket-client"

export default async function(user_id, user_name, first_name, last_name, extension) {
	this.handle_click_back()
	let { status, conv_id, row_down } = await fetch_data(`/chats/create`, {user_id: user_id})

	let conv = {
		conv_id: conv_id,
		conv_name: user_name,
		title: `${first_name} ${last_name}`,
		extension: extension,
		user_id: user_id,
		user_name: user_name,
		first_name: first_name,
		last_name: last_name,
		created_on: new Date(),
		deleted_by: null,
	}
	socket[this.names].emit('created-conv', {
		conv_id: conv_id,
		o: {
			...(account.current),
			// row_up: 0,
			// row_down: row_down
		}
	})
	socket[this.names].emit('join-conv', {conv_id: conv_id})
	this.add_prev(row_down, conv)
	await this.handle_click_prev(conv_id)
}
