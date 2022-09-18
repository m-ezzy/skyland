groups.send_message = async function (message = this.tm.value, key = this.tk.value, group_id = this.current) {
	if ([message, key].includes('')) {
		return;
	}

	let user_id2 = this.previous[this.current].user_id;
	let encrypted_message = encryption(message, key);

	let response = await fetch(backEnd.pre + 'groups/send_message' + backEnd.suf, {
		method: 'POST', 
		mode: 'cors', 
		headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
		body: `group_id=${this.current}&encrypted_message=${encrypted_message}`
	});
	let data = await response.json();

	groups.socket.emit('send-message', {'group_id': group_id, 'user_id': getCookie('user_id'), 'encrypted_message': encrypted_message});

	this.add_to_conv(group_id, getCookie('user_id'), data.group_media_id, 0, message);
}
