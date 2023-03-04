import do_remove_incoming from "../actions/do_remove_incoming"
import do_conn_call_cleanup from "../actions/do_conn_call_cleanup"

export default async function(names, conv_id, user_id) {
	// let data = await fetch_data('/calls/change_call_length_chats', {chat_id, user_id, call_type, time, 0})
	do_remove_incoming.call(this, names, conv_id)
	
	if (names == "chats") {
		//add code to send message to caller person that call was declined
		//await this.conn[user_id].send(JSON.stringify({'purpose': 'call_decline'}))
		do_conn_call_cleanup.call(this, user_id)
	} else {
		let members = groups.conv[conv_id].members
		delete members[account.current.user_id]
		Object.keys(members).forEach(user_id => {
			do_conn_call_cleanup.call(this, user_id)
		})
	}
}
