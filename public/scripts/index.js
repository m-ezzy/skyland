let menu_bar = new MenuBar()

let calls = new Calls(0, "call")
let chats = new Chats(1, "chat")
let groups = new Groups(2, "group")
let channels = new Channels(3, "channel")
let account = new Account(4, "account")

Content.instances.push(calls, chats, groups, channels, account)

theme.change();
data = fetchs('account/load', '').then(data => {
    me = data.json
    chats.handle_click_menu()
})
