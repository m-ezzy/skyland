// import express from "express"
// import http from "http"
// import https from 'https'
// import { ExpressPeerServer } from "peer"

// const port = process.env.PORT || "8002"; //8000 / 9000 /8080

// const app = express()
// const httpServer = http.createServer(app)
// const httpsServer = https.createServer(app)


import { PeerServer } from 'peer'
import configurations from '../configurations.mjs'
let { port, path } = configurations.peer_server

const peerServer = PeerServer({
	allow_discovery: true,
	debug: true,
	// proxied: true,
	//ssl: {}
	port: port, //80 //443 //8000 //8002 //9000
	path: path,
})

// app.use(peerServer)

/*
const peerServer = ExpressPeerServer(httpServer, {
	debug: true,
	proxied: false, //true //false
	path: '/peer',
	port: 443, //'' //80 //443 //8000 //8002 //9000
	secure: true, //true / false
	ssl: {}
})
app.use(peerServer)
*/
/*
httpServer.listen(port, () => {
	console.log(`http server is listening on : ${port}`)
})*/
/*
httpsServer.listen(port, () => {
	console.log(`https server is listening on : ${port}`);
})*/
