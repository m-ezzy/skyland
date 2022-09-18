chats.add_to_conv = function(chat_id, user_id, chat_media_id, media_type, text) {
	console.log(user_id, getCookie('user_id'));
	let class_name = (user_id == getCookie('user_id')) ? 'sent' : 'received';
	let div = document.createElement('div');
	div.innerHTML = `fn: ${this.previous[chat_id].first_name} , ln: ${this.previous[chat_id].last_name}`;
	let m = create_div(class_name, '', '', '');
	m.appendChild(div);

	let e;

	if(media_type == 0) {
		let message = (user_id == getCookie('user_id')) ? text : decryption(text, this.tk.value);
		//e.className +=  `messages`;
		m.classList.add('messages');
		m.innerHTML += message;
	} else if(media_type == 1) {
		m.classList.add('images');
		e = create_image('', '', '', `data/chats/${chat_id}/${chat_media_id}.${text}`, '200', '200');
		m.appendChild(e);
	} else if(media_type == 2) {
		m.classList.add('videos');
		e = create_video('', '', '', '', '200', '200');
		m.appendChild(e);
	}

	document.getElementById(`conv_chats_${chat_id}`).appendChild(m);
	document.getElementById(`conv_chats_${chat_id}`).scrollBy(0, 500);
	/*this.previous[this.current].conversation.scrollBottom();
	/*this.previous[this.current].conversation.scrollTo(0,500);
	(last div tag in message list).scrollIntoView();*/

	if (this.current != chat_id) {
		document.getElementById(`nmi_chats_${chat_id}`).innerHTML = (Number(document.getElementById(`conv_chats_${chat_id}`).innerText) + 1);
	}
}
