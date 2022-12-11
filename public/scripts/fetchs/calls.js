fetchs.calls.load = async () => {
    let response = await fetch(backEnd.pre + 'calls/load' + backEnd.suf, {
        method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: ''
    })
	let data = await response.json()
	console.log("fetch   ", data)
    return data
}
fetchs.calls.make_call_chats = async (chat_id, user_id, call_type) => {
    const response = await fetch(backEnd.pre + "calls/make_call_chats" + backEnd.suf, {
        method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: "chat_id=" + chat_id + "&user_id=" + user_id + "&call_type=" + call_type
    })
	let data = await response.json()
	console.log("fetch   ", data)
    return data
}
fetchs.calls.make_call_groups = async (group_id, user_id, call_type) => {
    const response = await fetch(backEnd.pre + "calls/make_call_groups" + backEnd.suf, {
        method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: "group_id=" + group_id + "&call_type=" + call_type
    })
	let data = await response.json()
	console.log("fetch   ", data)
    return data
}
fetchs.calls.change_call_length_chats = async (chat_id, user_id, call_type, time) => {
    const response = await fetch(backEnd.pre + "calls/change_call_length_chats" + backEnd.suf, {
        method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: "chat_id=" + chat_id + "&user_id=" + user_id + "&call_type=" + call_type + "&time=" + time
    })
	let data = await response.json()
	console.log("fetch   ", data)
    return data
}/*
fetchs.calls.get_group_members = async (group_id) => {
    let response = await fetch(backEnd.pre + 'calls/get_group_members' + backEnd.suf, {
        method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: ''
    })
	let data = await response.json()
	console.log("fetch   ", data)
    return data
}*/
