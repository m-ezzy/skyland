Groups.prototype.handle_click_add_member = async function() {   //add_member //join
	let data = await fetch_data(`${this.names}/add_member`, {group_id: this.current, user_name: this.tam.value})   //`group_id=${this.current}&user_id=${this.tam.value}`
	this.previous[this.current].members[data.user_id] = data.value
	this.add_item_member(data.user_id, data.value)
	socket[this.names].emit('added-member', {group_id: this.current, user_id: data.user_id, 'value': JSON.stringify(this.previous[this.current])})
}
