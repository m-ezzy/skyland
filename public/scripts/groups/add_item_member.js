Groups.prototype.add_item_member = function(user_id, {user_name, first_name, last_name, extension}) {
	let div = this.create_item_hero('users', user_id, user_name, `${first_name} ${last_name}`, extension, `mem_${this.names}_${user_id}`, '')
	this.lmem.appendChild(div)
}
