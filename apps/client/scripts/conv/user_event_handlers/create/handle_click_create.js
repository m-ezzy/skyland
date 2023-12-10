import { fetch_data } from "../../clients/api-client"
import { socket } from '../../clients/socket-client'

export default async function() {
	// if( this.validation.create == false ) {return} //this would be wrong
	if( this.validation.create.conv_name == false || this.validation.create.title == false ) {return}

	const conv_name = this.e.modal_create.getElementsByClassName("textbox create_conv_name")[0].value
	const title = this.e.bar.explore.getElementsByClassName("textbox create_title")[0].value
	
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
	this.add_prev(conv_id, conv, members)
	this.handle_click_prev(conv_id)
}
