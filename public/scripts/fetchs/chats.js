fetchs.chats.load = async () => {
	let response = await fetch(backEnd.pre + 'chats/load' + backEnd.suf, {
		method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
		body: ''
	});
	let data = await response.json()
	console.log("fetch   ", data)
	return data
}
fetchs.chats.get_previous = async () => {
	let response = await fetch(backEnd.pre + 'chats/get_previous' + backEnd.suf, {
		method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
		body: ''
	});
	let data = await response.json()
	console.log("fetch   ", data)
	return data
}
fetchs.chats.search_new = async (q) => {
	let response = await fetch(backEnd.pre + "chats/search_new" + backEnd.suf, {
		method: "POST", mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
		body: 'q=' + q
	})
	let data = await response.json()
	console.log("fetch   ", data)
	return data
}
fetchs.chats.create_new = async (user_id) => {
	const response = await fetch("/chats/create_new", {
		method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
		body: 'user_id2=' + user_id
	})
	let data = await response.json()
	console.log("fetch   ", data)
	return data.chat_id
}
fetchs.chats.history_conv = async (chat_id, row_up) => {
	let response = await fetch(backEnd.pre + 'chats/history_conv' + backEnd.suf, {
		method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
		body: `chat_id=${chat_id}&row_up=${row_up}`
	})
	let data = await response.json()
	console.log("fetch   ", data)
	return data
}
fetchs.chats.send_message = async (chat_id, encrypted_message) => {
	let response = await fetch(backEnd.pre + 'chats/send_message' + backEnd.suf, {
		method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
		body: `chat_id=${chat_id}&encrypted_message=${encrypted_message}`
	})
	let data = await response.json();
	console.log("fetch   ", data)
	return data
}
fetchs.chats.check_for_new = async () => {
	//send how many chat's you currently have
	const response = await fetch(`${backEnd.pre}chats/check_for_new${backEnd.suf}`, {
		method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
		body: ''
	})
	let data = await response.json();
	console.log("fetch   ", data)
	return data
}
