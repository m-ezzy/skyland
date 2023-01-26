Groups.prototype.handle_click_create = async function() {
	let title = this.ls.getElementsByClassName("text create_title")[0].value
	if(title == '') {return}
	this.ls.classList.add('hidden')
	let data = await fetch_data(`${this.names}/create`, {group_name: this.ts.value, title: title})   //`group_name=${this.ts.value}&title=${title}`

	this.previous[data.group_id] = {
		conv_name: this.ts.value,
		title: title,
		extension: null,
		row_up: 0,
		row_down: data.row_num,
		members: {
			[me.user_id]: {
				//...me,
				user_name: me.user_name,
				first_name: me.first_name,
				last_name: me.last_name,
				extension: me.extension,
			}
		}
	}
	socket[this.names].emit('created-new-group', {group_id: data.group_id})

	this.add_item_previous(data.group_id, this.previous[data.group_id])
	this.add_item_conv(data.group_id)
	await this.handle_click_prev(data.group_id)
}
