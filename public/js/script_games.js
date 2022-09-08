
socket.chats.on('challenge-the-opponent', (data) => {
	socket.games.emit('challenge-accepted', data);

	games.clicked();
});

socket.chats.on('started-new-game', (data) => {
	console.log(data);
	//num = 1;
});

socket.games.on('receive-new-bar-position', (data) => {
	console.log(data);
	document.getElementsByClassName('bar')[(num == 1) ? 0 : 1].style.top = data.newy + 'px';
});
