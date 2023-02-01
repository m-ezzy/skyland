export default function({conv_id, user_id, member_type}) {
	if(user_id == account.current.user_id || (this.names == 'channels' && member_type == 1)) {
		let prev = document.getElementById(`prev_${this.names}_${conv_id}`)

		if(this.names == 'groups') {
			this.e.l.prev.removeChild(prev)
		} else if (this.names == 'channels') {
			let member_type = this.conv[conv_id].members[account.current.user_id].member_type
			let section = this.e.l.prev.getElementsByClassName('section')[member_type - 1]
			section.removeChild(prev)
			if (section.childElementCount == 1) {
				section.classList.add('hidden')
			}
		}
		this.e.l.conv.removeChild(document.getElementById(`conv_${this.names}_${conv_id}`))

		if(this.current == conv_id) {
			this.current = 0
			this.e.bar.conv.classList.add('hidden')
			this.e.bar.info.classList.add('hidden')
			history.pushState('', '', `/${this.names}`)
		}
		delete this.conv[conv_id]
		// this.conv[this.current] = {}
	} else {
		if (this.current == conv_id) {
			let mem = document.getElementById(`mem_${this.names}_${user_id}`)
			if (this.names == 'groups') {
				this.e.l.mem.removeChild(mem)
			} else if (this.names == 'channels') {
				this.e.l.mem.getElementsByClassName('section')[member_type - 1].removeChild(mem)
			}
		}
		delete this.conv[conv_id].members[user_id]
	}
}
