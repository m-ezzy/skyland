let menu_bar = new MenuBar()

let calls = new Calls(0, "call")
let chats = new Chats(1, "chat")
let groups = new Groups(2, "group")
let channels = new Channels(3, "channel")
let account = new Account(4, "account")

Content.instances = {calls: calls, chats: chats, groups: groups, channels: channels, account: account}

theme.change()

console.log(getCookie("menu"), getCookie("conv"), getCookie("info"))
console.log(getCookie("menu") == null, getCookie("menu") == '')

let data = fetch_data('users/get_info', '').then(async (data) => {
	me = data

	if (getCookie("menu") != null) {
		let menu = getCookie("menu")
		await Content.instances[menu].handle_click_menu()

		if (getCookie("conv") != null) {
			let name = getCookie("conv")
			let id = 0
	
			console.log(name)
			if(Content.current.names == "chats") {
				Object.entries(chats.previous).forEach(([chat_id, v]) => {
					if(v.user_name == name) {
						id = chat_id
					}
				})
			} else if (Content.current.names == "groups") {
				Object.entries(groups.previous).forEach(([group_id, v]) => {
					if(v.group_name == name) {
						id = group_id
					}
				})
			} else if (Content.current.names == "channels") {
				Object.entries(channels.previous).forEach(([channel_id, v]) => {
					if(v.channel_name == name) {
						id = channel_id
					}
				})
			}
			Content.current.handle_click_prev(id)

			if (getCookie("info")) {
				Content.current.handle_click_info()
			}
		}
	} else {
		await chats.handle_click_menu()
	}
})

/*
localStorage.setItem('user_id', data.json.user_id);
sessionStorage.setItem('user_id', data.json.user_id);
console.log(localStorage.getItem('user_id'));
console.log(sessionStorage.getItem('user_id'));
*/
/*
document.body.onload = function() {
		Object.entries(document.getElementsByClassName('button')).forEach(([num, e]) => {
				console.log(e)
				e.style.backgroundImage = ''
		})
}*/
