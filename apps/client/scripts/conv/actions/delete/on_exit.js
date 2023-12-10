//update_leave //on_member_leave //delete_member
export default function({conv_id, user_id}) {
	if(this.names == 'chats') {
		if(user_id == account.current.user_id) {
			this.conv[conv_id].deleted_by)) {
		if(user_id == account.current.user_id) {
			let prev = document.getElementById(`prev_${this.names}_${conv_id}`)
			this.e.l.prev.removeChild(prev)
			this.e.l.conv.removeChild(document.getElementById(`conv_${this.names}_${conv_id}`))
		} else {
		}
	}

	if(this.names == 'chats' && user_id == account.current.user_id) {
		this.conv[conv_id].deleted_by = user_id
	} else {
		//let use know that other user blocked them
	}
	if(this.names == 'chats' || this.names == 'groups') {
		if(user_id == account.current.user_id) {
			this.e.l.prev.removeChild(prev)
			this.e.l.conv.removeChild(document.getElementById(`conv_${this.names}_${conv_id}`))
		} else {
		}
	} else {
		let member_type = this.conv[conv_id].members[account.current.user_id].member_type
		let section = this.e.l.prev.getElementsByClassName('section')[member_type - 1]
		section.removeChild(prev)
		if (section.childElementCount == 1) {
			section.classList.add('hidden')
		}
		delete this.conv[conv_id]
		this.e.l.conv.removeChild(document.getElementById(`conv_${this.names}_${conv_id}`))
	}
	if(this.current == conv_id) {
		this.current = 0
		this.info_is_open = false
		this.e.bar.conv.classList.add('hidden')
		this.e.bar.info.classList.add('hidden')
		this.update_browser_route()
	}
}
