let socket = {
	def: io('/'),
	chats: io('/chats'),
	groups: io('/groups'),
	//channels: io('/channels'),
	games: io('/games'),
};

socket.def.emit('new-connection', { 'user_id': getCookie('user_id') });
