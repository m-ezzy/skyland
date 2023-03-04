export default function() {
	let conv_id = this.current

	if(this.names == 'groups') {
		this.e.l.mem.innerHTML = ''
	} else {
		Object.values(this.e.l.mem.getElementsByClassName('section')).forEach(e => {
			e.innerHTML = ''
		})
		if (this.conv[conv_id].members[account.current.user_id].member_type == 1) {
			this.e.bar.info.getElementsByClassName('update_controls')[0].classList.remove('hidden')
		} else {
			this.e.bar.info.getElementsByClassName('update_controls')[0].classList.add('hidden')
		}
	}
	Object.entries(this.conv[conv_id].members).forEach(([user_id, user]) => {
		this.add_member(conv_id, user, false)
	})
	if ( (this.names == 'channels' && this.conv[conv_id].members[account.current.user_id].member_type == 1) || (Object.keys(this.conv[conv_id].members).length == 1) ) {
		this.e.b.exit.classList.remove('leave')
		this.e.b.exit.classList.add('delete')
		this.e.b.exit.setAttribute('data-tooltip', 'delete')
	} else {
		this.e.b.exit.classList.remove('delete')
		this.e.b.exit.classList.add('leave')
		this.e.b.exit.setAttribute('data-tooltip', 'leave')
	}
}
