chats.socket = io('/chats');

//let def = {};
//def.socket.emit('new-connection', { 'user_id': getCookie('user_id') });

chats.socket.on('receive-message', (data) => {
	console.log(data);
    chats.add_to_conv(data.chat_id, chats.previous[data.chat_id].user_id, data.chat_media_id, 0, data.encrypted_message);
});
