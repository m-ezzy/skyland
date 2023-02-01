import { fetch_data } from "../tools"
import { socket } from "../sockets"

export default async function(user_id, user_name, first_name, last_name, extension) {
	this.handle_click_back()
	let { status, chat_id, row_down } = await fetch_data(`/chats/create`, {user_id2: user_id})
	
	let conv = {
		conv_id: chat_id,
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
		conv_id: chat_id,
		o: {
			...(account.current),
			// row_up: 0,
			// row_down: row_down
		}
	})
	socket[this.names].emit('join-conv', {chat_id: chat_id})

	this.item_previous(row_down, conv)
	this.item_conv(chat_id)
	await this.handle_click_prev(chat_id)
}
