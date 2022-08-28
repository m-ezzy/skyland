
socket.chats.on('challenge-the-opponent', (data) => {
	socket.games.emit('challenge-accepted', data);

	games.clicked();
});
