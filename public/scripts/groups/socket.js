groups.socket = io('/groups');

//let def = {};
//def.socket.emit('new-connection', { 'user_id': getCookie('user_id') });

groups.socket.on('receive-message', (data) => {
	console.log(data);
    groups.add_to_conv(data.group_id, data.user_id, 500, 0, data.encrypted_message);
});
