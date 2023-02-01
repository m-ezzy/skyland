export default function(group_id, {user_id, user_name, first_name, last_name, extension}) {
	// if(this.current == group_id) {
		let div = this.item_hero('users', user_id, user_name, `${first_name} ${last_name}`, extension, `mem_${this.names}_${user_id}`, '')
		this.e.l.mem.appendChild(div)
	// }
}
