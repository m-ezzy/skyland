export default async function(call_type) {
	let func = [calls.make_call_chats, calls.make_call_groups]
	await calls.handle_click_menu()
	if (this.names == 'chats') {
		await func[0](call_type, this.current, this.conv[this.current].user_id)
	} else {
		await func[1](call_type, this.current, this.conv[this.current].members)
	}
}
