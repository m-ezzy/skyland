Chats.prototype.handle_click_delete = async function() {
	let block = this.previous[this.current].deleted_by ? false : true
	let data = await fetch_data(`${this.names}/delete`, {chat_id: this.current, block: block})   //`chat_id=${this.current}`
	this.lp.removeChild(document.getElementById(`prev_${this.names}_${this.current}`))
	this.lc.removeChild(document.getElementById(`conv_${this.names}_${this.current}`))
	this.previous[this.current] = {}
	this.current = 0
	window.history.pushState('', '', '/chats')
	this.barc.classList.add('hidden')
	this.bari.classList.add('hidden')
	//also emmit event to leave this socket.io room
}
