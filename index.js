const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const express = require("express");
const http = require('http');
const https = require('https');
const path = require('path');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || "8000";

const socket_io = require('./nodejs/socket_io')
let io = socket_io(server)

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
