import { fetch_data } from "../tools"
import { socket } from "../sockets"

export default async function() {
	let block = this.conv[this.current].deleted_by ? false : true
	let data = await fetch_data(`/${this.names}/delete`, {chat_id: this.current, block: block})   //`chat_id=${this.current}`
	this.e.l.prev.removeChild(document.getElementById(`prev_${this.names}_${this.current}`))
	this.e.l.conv.removeChild(document.getElementById(`conv_${this.names}_${this.current}`))

	delete this.conv[this.current]
	this.current = 0
	window.history.pushState('', '', '/chats')
	this.e.bar.conv.classList.add('hidden')
	this.e.bar.info.classList.add('hidden')
	//also emmit event to leave this socket.io room
}
