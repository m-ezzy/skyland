import { fetch_data } from "../tools"
import { socket } from "../sockets"

export default async function() {
	const conv_name = this.e.t.search.value
	const title = this.e.l.search.getElementsByClassName("text create_title")[0].value
	if(title == '') {return}
	const { conv_id, row_num } = await fetch_data(`/${this.names}/create`, {conv_name: conv_name, title: title})
	socket[this.names].emit('join-conv', {conv_id: conv_id})

	let conv = {
		conv_id: conv_id,
		conv_name: conv_name,
		title: title,
		extension: null,
	}
	let members = []
	members.push(account.current)
	if(this.names == 'channels') {
		members[0]['member_type'] = 1
	}
	this.handle_click_back()
	this.item_previous(conv_id, conv, members)
	this.item_conv(conv_id)
	await this.handle_click_prev(conv_id)
}
