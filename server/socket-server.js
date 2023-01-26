import { Server } from 'socket.io'

export default (httpServer) => {
	/*const io = new Server(httpServer, {
		cors: "*",
	})*/

const io = new Server(httpServer, {
	cors: "*",
	serveClient: true,
})

let online = {
	def: {},
	chats: {}
}

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
	// console.log(socket)
	console.log(socket.id)
	console.log('ggggggg6666666', socket.handshake.auth.user_id)
	online.def[socket.handshake.auth.user_id] = socket.id

	socket.join(socket.handshake.auth.user_id + '')

	socket.on("connection", (data) => {
		console.log(data)
	})
	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function (data) {
		console.log(socket.id)
		online.def[data.user_id] = null
	})
})
io.of('/chats').on('connection', (socket) => {
	console.log(socket.id)
	online.chats[socket.handshake.auth.user_id] = socket.id
	console.log(online)
	console.log(online)
	console.log(online)

	socket.on('join-conv-all', (data) => {
		console.log(data)
		data.chat_ids.forEach(chat_id => {
			socket.join(chat_id + '')
		})
	})
	socket.on('join-conv', (data) => { //connect-conv //join-conv
		socket.join(data.chat_id + '')
	})
	socket.on('created-chat', (data) => {
		// io.of('/chats')   OR
		io.to(online.chats[data.user_id + '']).emit('notify-created-chat', data)
	})
	socket.on('send-media', (data) => {
		console.log(data)
		socket.to(data.chat_id + '').emit('receive-media', data)
	})
})
io.of('/groups').on('connection', (socket) => {
	socket.on('join-all-my-rooms', (data) => {
		console.log(data)
		data.forEach(group_id => {
			socket.join(group_id)
		})
	})
	socket.on('created-new-group', (data) => {
		console.log(data)
		socket.join(data.group_id)
	})
	socket.on('added-member', (data) => {
		console.log(data)
		io.to(data.user_id + '').emit('added-member', data)
		// socket.to(data.user_id + '').emit('joined-new-group', data)
	})
	socket.on('join-group', (data) => {
		console.log(data)
		socket.join(data.group_id)
		// socket.to('' + data.group_id).emit('joined-new-group', data)
	})
	socket.on('send-media', (data) => {
		console.log(data)
		socket.to(data.group_id + '').emit('receive-media', data)
	})
	socket.on('update-info', (data) => {
		console.log(data)
		socket.to(data.conv_id + '').emit('update-info', data)
	})
	socket.on('member-left', (data) => {
		console.log(data)
		socket.leave(data.conv_id + '')
		socket.to(data.conv_id + '').emit('member-left', data)
	})
	socket.on('group-delete', (data) => {
		console.log(data)
		// room delete
	})
})
io.of('/channels').on('connection', (socket) => {
})

// return io
}

// export default io
