export default function({channel_id, user_id, member_type_old, member_type_new}) {
	this.conv[channel_id].members[user_id].member_type = member_type_new

	if(account.current.user_id == user_id) {
		let sections = this.e.l.prev.getElementsByClassName('section')
		let hero = document.getElementById(`prev_channels_${channel_id}`)
		sections[member_type_old - 1].removeChild(hero)
		sections[member_type_new - 1].appendChild(hero)
		
		if (sections[member_type_old - 1].childElementCount == 1) {
			sections[member_type_old - 1].classList.add('hidden')
		}
		sections[member_type_new - 1].classList.remove('hidden')
		
		if(member_type_new == 2) {
			this.e.sender.classList.remove('hidden')
		} else {
			this.e.sender.classList.add('hidden')
		}
	}
	// let num = member_types.findIndex(this.conv[conv_id].members[account.current.user_id].member_type)

	let member_types = ['', 'founder', 'manager', 'regular']
	Object.values(this.e.l.media.getElementsByClassName(`desig_${user_id}`)).forEach(desig => {
		desig.classList.remove(`bg-${member_types[member_type_old]}`)
		desig.classList.add(`bg-${member_types[member_type_new]}`)
		desig.innerText = member_types[member_type_new]
	})

	if (this.current == channel_id) {
		this.e.l.mem.getElementsByClassName('section')[member_type_old - 1].removeChild(document.getElementById(`mem_channels_${user_id}`))
		this.add_member(channel_id, this.conv[channel_id].members[user_id], false)
		/*
		document.getElementById(`conv_channels_${channel_id}`).innerHTML = ''
		this.conv[channel_id].row_up = this.conv[channel_id].row_down
		this.current = 0
		this.handle_click_prev(channel_id)
		*/
	}
}
