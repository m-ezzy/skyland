
let socket = {
	def: io('/'),
	chats: io('/chats'),
	//groups: io('/groups'),
	//channels: io('channels'),
	//games: io('games')
};

socket.def.emit('new-connection', { 'user_id': getCookie('user_id') });

console.log(socket);

socket.chats.on('receive-message', (data) => {
	console.log(data);
	let div = create_div('received messages', '', '', data.message);
	document.getElementById(`conversation_chats_${data.chat_id}`).append(div);
});


