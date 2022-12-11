//import { socket } from "../script_messaging.js";

Chats.prototype.get_previous = async function() {
	let data = await fetchs('chats/get_previous', '')
	this.previous = data.json
	//this.lp.innerHTML = data.html

	if (this.previous == null) { return }
	Object.entries(this.previous).forEach(([chat_id, v]) => {
		this.add_item_previous(chat_id, v)
	})
	/*
	following thing shouldnt happen
	only those previous conversation will be created and loaded that the user clicks on
	*/
	Object.entries(this.previous).forEach(([chat_id, v]) => {
		this.add_item_conv(chat_id)
		sessionStorage.setItem(`chats_messages_${chat_id}`, JSON.stringify([]))
	})
	socket.chats.emit('join-all-my-rooms', Object.keys(this.previous))
}
