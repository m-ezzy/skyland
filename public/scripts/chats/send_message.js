chats.send_message = async function (message = this.tm.value, key = this.tk.value, chat_id = this.current) {
	if ([message, key].includes('')) {
		return;
	}

	let user_id2 = this.previous[this.current].user_id;
	let encrypted_message = encryption(message, key);

	let response = await fetch(backEnd.pre + 'chats/send_message' + backEnd.suf, {
		method: 'POST', 
		mode: 'cors', 
		headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
		body: `chat_id=${this.current}&encrypted_message=${encrypted_message}`
	});
	let data = await response.json();
	console.log(data);

	this.previous[this.current].row_down = data.chat_media_id;

	chats.socket.emit('send-message', {'chat_id': chat_id, "chat_media_id": data.chat_media_id, 'encrypted_message': encrypted_message});

	this.add_to_conv(chat_id, getCookie('user_id'), data.chat_media_id, 0, message);
}
