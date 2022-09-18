chats.create_new = async function(user_id, user_name, first_name, last_name, extension) {
	const response = await fetch(backEnd.pre + "chats/create_new" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_id2=' + user_id});
	let data = await response.json();
	console.log(data);

	let o = {"chat_id": data.chat_id, "user_id": user_id, "user_name": user_name, "first_name": first_name, "last_name": last_name, "extension": extension, "row_up": 0, "row_down": data.row_down};
	return o;
}
