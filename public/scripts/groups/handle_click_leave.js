Groups.prototype.handle_click_leave = async function() {
	socket.groups.emit('member-left', {conv_id: this.current, user_id: me.user_id})
	//also emmit event to leave this socket.io room

	let status = await fetch_data(`groups/leave`, {group_id: this.current})   //`group_id=${this.current}`
	this.lp.removeChild(document.getElementById(`prev_${this.names}_${this.current}`))
	this.lc.removeChild(document.getElementById(`conv_${this.names}_${this.current}`))
	delete this.previous[this.current]
	// this.previous[this.current] = {}
	this.current = 0

	window.history.pushState('', '', '/groups')
	this.barc.classList.add('hidden')
	this.bari.classList.add('hidden')
	// no need for below code. just hide both bars
	/*
	if (Object.keys(this.previous).length) {
		this.handle_click_prev(Object.keys(this.previous)[0])
	} else {
		this.di.src = ''
		this.dt.innerHTML = ''
		this.tgn.value = ''
		this.tt.value = ''
		this.lmem.innerHTML = ''
		// this.lmem.style.display = 'none'
	}*/
}
