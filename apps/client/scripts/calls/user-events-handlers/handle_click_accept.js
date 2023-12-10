import { fetch_data } from "../../clients/api-client"
import { stream_local } from "../get_permissions_audio_video"
import do_remove_incoming from "../actions/do_remove_incoming"
import do_in_call_setup from "../actions/do_in_call_setup"

// call_accept_chats
export default async function(names, conv_id, user_id, call_type, time) {
	if(this.current) {return}
	// let data = await fetch_data.calls.change_call_length_chats(chat_id, user_id, call_type, time);

	if(names == 'chats') {
		// let data = await fetch_data('/calls/update_call_length_chats', {conv_id: conv_id, user_id: user_id, call_type: call_type})
		this.calls[user_id].answer(stream_local[call_type])
	}
	do_remove_incoming.call(this, names, conv_id)
	do_in_call_setup.call(this, names, conv_id, user_id, call_type, time)
}
