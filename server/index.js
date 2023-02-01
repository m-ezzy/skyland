import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from "express"
import { createServer } from 'http'
// const https = require('https')
//import process from 'process'
import cors from 'cors'

import socket_server from './socket-server.js'
import allRouter from './routes/all.js'

const port = process.env.PORT || "8000"
const app = express()
const http_server = createServer(app)

app.use(cors())

socket_server(http_server)

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

app.use(cookieParser())

// Parse URL-encoded bodies (as sent by HTML forms)
//app.use(express.urlencoded( {extended: true} ));
// Parse JSON bodies (as sent by API clients)
//app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('views', process.cwd() + '/views')
app.set('view engine', 'ejs')

// console.log(process.cwd())
// app.use(express.static(process.cwd() + '\public'))
app.use('/', allRouter)

http_server.listen(port, () => {
	console.log(`server is listening on port ${port}`)
})
