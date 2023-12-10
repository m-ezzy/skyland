import do_conn_call_cleanup from "../actions/do_conn_call_cleanup"
import do_remove_incoming from "../actions/do_remove_incoming"
import do_call_end from "../actions/do_call_end"

export default async function(user_id) {
	console.log('peer ----- call on close | user_id = ', user_id)
	do_conn_call_cleanup.call(this, user_id)

	if ( 
		this.current && ( ( 
				this.current.names == 'chats' && 
				chats.conv[this.current.conv_id].user_id == user_id 
			) || ( 
				this.current.names == 'groups' && 
				Object.keys(groups.conv[this.current.conv_id].members).includes(user_id) && 
				( Object.keys(this.calls).length == 1 ) 
			) 
		) 
	) {
		do_call_end.call(this)
	} else {
		let chat_id = 0
		Object.entries(chats.conv).forEach(([conv_id, conv]) => {
			if(conv.user_id == user_id) {
				chat_id = conv_id
			}
		})
		if(chat_id) {
			do_remove_incoming.call(this, 'chats', chat_id)
		} else {
			// check if user was last member to leave incoming group call
		}
	}
}
