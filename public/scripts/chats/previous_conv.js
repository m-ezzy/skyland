//import { socket } from "../script_messaging.js";

Chats.prototype.previous_conv = async function() {
	let data = await fetch_data('chats/previous_conv', '')
	this.previous = data

	if (isEmpty(this.previous)) { return }
	Object.entries(this.previous).forEach(([chat_id, v]) => {
		if( v.deleted_by != me.user_id ) {
			this.add_item_previous(chat_id, v)
			this.add_item_conv(chat_id)
		}
		//sessionStorage.setItem(`chats_messages_${chat_id}`, JSON.stringify([]))
	})
	/* only those previous conversation will be created and loaded that the user clicks on */
	socket.chats.emit('join-conv-all', {chat_ids: Object.keys(this.previous)})
}
