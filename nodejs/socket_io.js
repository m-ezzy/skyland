const socketio = require('socket.io');

let io;

module.exports = function(server) {
	io = socketio(server);
	
/*
import { Server } from "socket.io";
const io = new Server(server, {
	serveClient: true,
});
*/

//let sio = require('./nodejs/sockets/handleSockets')(io);

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
	console.log(socket.id);

	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
		console.log(socket.id);
	});

	socket.on("new-connection", (data) => {
		console.log(data);
		console.log(data.user_id);
	});
});

io.of('/chats').on('connection', (socket) => {
	socket.on('join-all-my-rooms', (data) => {
		console.log(data);
		data.forEach(chat_id => {
			socket.join(chat_id);
		});
	});
	socket.on('send-message', (data) => {
		console.log(data);
		socket.to('' + data.chat_id).emit('receive-message', data);
	});
});
io.of('/groups').on('connection', (socket) => {
	socket.on('join-all-my-rooms', (data) => {
		console.log(data);
		data.forEach(group_id => {
			socket.join(group_id);
		});
	});
	socket.on('send-message', (data) => {
		console.log(data);
		socket.to('' + data.group_id).emit('receive-message', data);
	});
});
io.of('/channels').on('connection', (socket) => {
});

return io;
}
