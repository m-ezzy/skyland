import { create_div } from "../tools"

export default function(conv_id, {user_id, user_name, first_name, last_name, extension, member_type}) {
	this.conv[conv_id].members[user_id] = user_id

	let member_types = ['', 'founder', 'manager', 'regular']

	if(this.current == conv_id) {
		let div = this.item_hero('users', user_id, user_name, `${first_name} ${last_name}`, extension, `mem_${this.names}_${user_id}`, '')
		let desig = create_div(`flex center border designation bg-${member_types[member_type]}`, '', '', member_types[member_type], true)

		if (this.conv[this.current].members[account.current.user_id].member_type == 1 && user_id != account.current.user_id) {
			let classes = ['bg-red demote', 'bg-green promote'][member_type - 2]
			// let click_handler = [`channels.handle_click_demote(${user_id})`, `channels.handle_click_promote(${user_id})`]
			let text = ['demote', 'promote'][member_type - 2]
			let button = create_div(`button square border flex center ${classes}`, '', `channels.handle_click_demote_promote(${user_id},${member_type})`, text, true)
			div.appendChild(button)
		}
		div.appendChild(desig)
		this.e.l.mem.getElementsByClassName('section')[member_type - 1].appendChild(div)
	}
}
