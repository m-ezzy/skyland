const express = require("express");
const http = require('http');
const path = require('path');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var auth = require("./routes/auth/auth");
var user_name_is_registered = require("./routes/auth/user_name_is_registered");
var sign_up = require("./routes/auth/sign_up");
var log_in = require("./routes/auth/log_in");

var calls = {
	load: require("./routes/calls/load"),
	send_my_peer_id: require("./routes/calls/send_my_peer_id"),
	create_new_call: require("./routes/calls/create_new_call"),
};

var chats = {
	load: require("./routes/chats/load"),
	search: require("./routes/chats/search"),
	create_new: require("./routes/chats/create_new"),
};

//var groups = require("./routes/groups");

//var channels = require("./routes/channels");

//var games = require("./routes/games");

var profiles = {
	load: require("./routes/profiles/load"),
};

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || "8000";

app.use(express.static(path.join(__dirname, 'src')));

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: '/internet-phone',
    ssl: {},
});
app.use(peerServer);

console.log(__dirname);

app.use(cookieParser());

// Parse URL-encoded bodies (as sent by HTML forms)
//app.use(express.urlencoded( {extended: true} ));
// Parse JSON bodies (as sent by API clients)
//app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", auth);
app.use("/auth/user_name_is_registered", user_name_is_registered);
app.use("/auth/sign_up", sign_up);
app.use("/auth/log_in", log_in);

app.use("/calls/load", calls.load);
app.use("/calls/send_my_peer_id", calls.send_my_peer_id);
app.use("/calls/create_new_call", calls.create_new_call);

app.use("/chats/load", chats.load);
app.use("/chats/search", chats.search);
app.use("/chats/create_new", chats.create_new);
app.use('/chats/show_conversation', require('./routes/chats/show_conversation'));
app.use('/chats/send_message', require('./routes/chats/send_message'));

//app.use("/groups", groups);

app.use("/profiles/load", profiles.load);

/*
app.get("/", (req, res) => {
	console.log('Cookies: ', req.cookies);
	console.log('Signed Cookies: ', req.signedCookies);

	res.contentType('text/html');
	//if (req.cookies) {
		//res.sendFile(`${__dirname}/index.html`);
	//} else {
		res.sendFile(`${__dirname}/public/authentication.html`);
	//}
});
*/

server.listen(port);

console.log(`Listening on: ${port}`);
