import { create_div, create_hero } from "../../elements"

//item_member //add_member //add_item_member //on_member_add
export default function(conv_id, user, new_member) {
	if(new_member) {
		user['title'] = `${user.first_name} ${user.last_name}`
		this.conv[conv_id].members[user.user_id] = user
	}
	if(this.current == conv_id) {
		let div = create_hero('users', user.user_id, user.user_name, user.title, user.extension, `mem_${this.names}_${user.user_id}`, '')
		if(this.names == 'groups') {
			this.e.l.mem.appendChild(div)
		}
		if(this.names == 'channels') {
			let member_types = ['', 'founder', 'manager', 'regular']
			let desig = create_div(`flex center border designation bg-${member_types[user.member_type]}`, '', '', member_types[user.member_type])

			if (this.conv[conv_id].members[account.current.user_id].member_type == 1 && user.user_id != account.current.user_id) {
				let classes = ['bg-red demote', 'bg-green promote'][user.member_type - 2]
				if(this.e.b.edit.classList.contains('hidden') == false) {
					classes += ' hidden'
				}
				// let click_handler = [`channels.handle_click_demote(${user_id})`, `channels.handle_click_promote(${user_id})`]
				let text = ['demote', 'promote'][user.member_type - 2]
				let button = create_div(`button square border flex center ${classes}`, '', `channels.handle_click_demote_promote(${user.user_id})`, text, true)
				div.appendChild(button)
			}
			div.appendChild(desig)
			this.e.l.mem.getElementsByClassName('section')[user.member_type - 1].appendChild(div)
		}
	}
}
