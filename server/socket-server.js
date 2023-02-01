import { Server } from 'socket.io'

export default (httpServer) => {
	/*const io = new Server(httpServer, {
		cors: "*",
	})*/

const io = new Server(httpServer, {
	cors: {
    origin: ["http://localhost:5174"],
		methods: '*',
    allowedHeaders: "*",
    credentials: true
  },
	// cors: "*",
	// serveClient: true,
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
	socket.on('join-conv', (data) => { //connect-conv //join-conv //created-new
		console.log(data)
		socket.join(data.conv_id + '')
	})
	socket.on('created-conv', (data) => {
		console.log(data)
		socket.join(data.conv_id + '')
		// io.of('/chats')   OR
		// io.to(online.chats[data.user_id + '']).emit('notify-created-chat', data)
		io.of('/').to(data.user_id + '').emit('created-conv', data)
	})
	socket.on('send-media', (data) => {
		console.log(data)
		socket.to(data.conv_id + '').emit('receive-media', data)
	})
	socket.on('delete', (data) => {
		console.log(data)
		socket.leave(data.conv_id + '')
	})
})
io.of('/groups').on('connection', (socket) => {
	socket.on('join-all-my-rooms', (data) => {
		console.log(data)
		data.forEach(group_id => {
			socket.join(group_id + '')
		})
	})
	socket.on('join-conv', (data) => {
		console.log(data)
		socket.join(data.conv_id + '')
	})
	socket.on('added-member', (data) => {
		console.log(data)
		socket.to(data.conv_id + '').emit('added-member', data)
		io.of('/').to(data.user_id + '').emit('groups-added-member', data)
		// socket.to(data.user_id + '').emit('joined-new-group', data)
	})
	socket.on('send-media', (data) => {
		console.log(data)
		socket.to(data.conv_id + '').emit('receive-media', data)
	})
	socket.on('update-info', (data) => {
		console.log(data)
		socket.to(data.conv_id + '').emit('update-info', data)
	})
	socket.on('member-left', (data) => {
		console.log(data)
		socket.to(data.conv_id + '').emit('member-left', data)
		socket.leave(data.conv_id + '')
	})
	socket.on('delete', (data) => {
		console.log(data)
		// room delete
	})
})
io.of('/channels').on('connection', (socket) => {
	socket.on('join-all-my-rooms', (data) => {
		console.log(data)
		data.forEach(channel_id => {
			socket.join(channel_id + '')
		})
	})
	socket.on('join-conv', (data) => {
		console.log(data)
		socket.join(data.conv_id + '')
	})
	socket.on('added-member', (data) => { //member-joined
		console.log(data)
		socket.join(data.conv_id + '')
		socket.to(data.conv_id + '').emit('added-member', data)
	})
	socket.on('send-media', (data) => {
		console.log(data)
		socket.to(data.conv_id + '').emit('receive-media', data)
	})
	socket.on('update-info', (data) => {
		console.log(data)
		socket.to(data.conv_id + '').emit('update-info', data)
	})
	socket.on('designation-change', (data) => {
		console.log('designation-change', data)
		socket.to(data.channel_id + '').emit('designation-change', data)
	})
	socket.on('member-left', (data) => {
		console.log(data)
		socket.to(data.conv_id + '').emit('member-left', data)
		socket.leave(data.conv_id + '')
	})
	socket.on('delete', (data) => {
		console.log(data)
		socket.leave(data.conv_id + '')
		socket.to(data.conv_id + '').emit('delete', data)
		// room delete
	})
})

// return io
}

// export default io
