export default async function(call_type) {
	if(calls.current) {return} //already in a call. end that first
	let conv_id = this.current
 	await calls.handle_click_menu()
 	calls.handle_click_call(this.names, conv_id, call_type)
}

// import { calls } from "../index"
// import handle_click_menu from "../menu/handle_click_menu"
// import call_make_chats from "../calls/call_make_chats"
// import call_make_groups from "../calls/call_make_groups"

// export default async function(call_type) {
// 	let conv_id = this.current
// 	await handle_click_menu.call(calls)
// 	if (this.names == 'chats') {
// 		call_make_chats.call(calls, call_type, conv_id, this.conv[conv_id].user_id)
// 	} else {
// 		call_make_groups.call(calls, call_type, conv_id, this.conv[conv_id].members)
// 	}
// }
