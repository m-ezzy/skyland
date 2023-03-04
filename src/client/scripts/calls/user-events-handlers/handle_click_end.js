import do_call_end from "../actions/do_call_end"

export default async function() {
	// check if call was received or not or declined
	// let data = await fetch_data.calls.change_call_length_chats(chat_id, user_id, call_type, time);
	do_call_end.call(this)
}
