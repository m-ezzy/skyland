import { fetch_data } from '../../api-client'
import do_make_call from "../actions/do_make_call"
import do_in_call_setup from "../actions/do_in_call_setup"

//call_make_chats //make_call_chats //make_new_call_chats //handle_click_call
export default async function(names, conv_id, call_type) {
	if (this.current.conv_id) {return}
	let data = await fetch_data(`/calls/make_call/${names}`, {conv_id: conv_id, user_id: account.current.user_id, call_type: call_type})

	if(names == 'chats') {
		// let user_id = chats.conv[conv_id].user_id
		do_make_call.call(this, names, conv_id, chats.conv[conv_id].user_id, call_type)
	}
	do_in_call_setup.call(this, names, conv_id, account.current.user_id, call_type)
	/*
	if (innerWidth <= configs.screen.mobile) {
		menu_bar.element.style.display = "none"
		this.bl.style.display = "none"
		this.bc.style.display = "grid"
	}*/
}
