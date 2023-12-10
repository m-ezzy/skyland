//update_leave //on_member_leave //delete_member
export default function({conv_id, user_id, ...v}) { //{conv_id, user_id, ...v}
	if(this.names == 'chats') {
		this.conv[conv_id].deleted_by = user_id
		//show member blocked in chat
	} else {
		if (this.current == conv_id) {
			let mem = document.getElementById(`mem_${this.names}_${user_id}`)
			if (this.names == 'groups') {
				this.e.l.mem.removeChild(mem)
			} else if (this.names == 'channels') {
				this.e.l.mem.getElementsByClassName('section')[v.member_type - 1].removeChild(mem)
			}
		}
		delete this.conv[conv_id].members[user_id]
	}
}
