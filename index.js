const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const express = require("express");
const http = require('http');
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
		console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
		console.log(data);
		data.forEach(chat_id => {
			console.log(chat_id);
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
		data.forEach(group_id => {
			console.log(group_id);
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
	//proxied: true,
	debug: true,
	path: '/internet-phone',
	port: 9000,
	//ssl: {}
});
app.use(peerServer);
*/
/*
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
	proxied: true,
	debug: true,
	path: '/internet-phone',
	//port: 443,
	ssl: {}
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

/*
var auth = require("./nodejs/auth/auth");
var user_name_is_registered = require("./nodejs/auth/user_name_is_registered");
var sign_up = require("./nodejs/auth/sign_up");
var log_in = require("./nodejs/auth/log_in");

let calls = {
	load: require("./nodejs/calls/load"),
	send_my_peer_id: require("./nodejs/calls/send_my_peer_id"),
};
let chats = {
	load: require("./nodejs/chats/load"),
	search: require("./nodejs/chats/search"),
	create_new: require("./nodejs/chats/create_new"),
};
let groups = {
	load: require("./nodejs/groups/load"),
	search: require("./nodejs/groups/search"),
	create_new: require("./nodejs/groups/create_new"),
}

//var groups = require("./nodejs/groups");

//var channels = require("./nodejs/channels");

//var games = require("./nodejs/games");

var profiles = {
	load: require("./nodejs/profiles/load"),
};

app.use("/", auth);
app.use("/auth/user_name_is_registered", user_name_is_registered);
app.use("/auth/sign_up", sign_up);
app.use("/auth/log_in", log_in);

app.use("/calls/load", calls.load);
app.use("/calls/send_my_peer_id", calls.send_my_peer_id);
app.use("/calls/make_new_call", require("./nodejs/calls/make_new_call"));

app.use("/chats/load", chats.load);
app.use("/chats/search", chats.search);
app.use("/chats/create_new", chats.create_new);
app.use('/chats/show_conversation', require('./nodejs/chats/show_conversation'));
app.use('/chats/send_message', require('./nodejs/chats/send_message'));

app.use("/groups/load", groups.load);
app.use("/groups/search", groups.search);
app.use("/groups/create_new", groups.create_new);

//app.use("/channels", channels);

//app.use("/games", games);

app.use("/profiles/load", profiles.load);
*/

server.listen(port, () => {
	console.log(`server is listening on port ${port}`);
});
