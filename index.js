const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const express = require("express");
const http = require('http');
const https = require('https');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || "8000";

const io = socketio(server);
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
io.of('/games').on('connection', (socket) => {
	socket.on('start-new-game', (data) => {
		socket.join(data.chat_id);

		console.log(data);

		//io.of("/chats").to(data.chat_id).emit('challenge-the-opponent', data);

		io.of("/chats").to(data.chat_id).emit('started-new-game', data);
	});
	socket.on('challenge-accepted', (data) => {
		console.log(data);
		socket.join(data.chat_id);
	});
	socket.on('send-new-bar-position', (data) => {
		console.log(data);
		socket.to(data.chat_id).emit('receive-new-bar-position', data);
	});
});

console.log(__dirname);

/*
const { PeerServer } = require('peer');
const peerServer = PeerServer({
	proxied: true,
	debug: true,
	path: '/internet-phone',
	port: 443,
	//ssl: {}
});
app.use(peerServer);
*/
/*
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
	//proxied: true,
	debug: true,
	path: '/internet-phone',
	port: 443,
	//ssl: {}
});
app.use(peerServer);
*/

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

// Parse URL-encoded bodies (as sent by HTML forms)
//app.use(express.urlencoded( {extended: true} ));
// Parse JSON bodies (as sent by API clients)
//app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'nodejs/views'));
app.set('view engine', 'ejs')

app.use('/', require('./nodejs/routes/all'));

server.listen(port, () => {
	console.log(`server is listening on port ${port}`);
});
