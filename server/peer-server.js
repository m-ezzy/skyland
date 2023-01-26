import express from "express"
import http from "http"
//import https from 'https'
import { peerServer, ExpressPeerServer } from "peer"

const port = process.env.PORT || "8002"; //8000 / 9000 /8080


const app = express()
const httpServer = http.createServer(app)
//const httpsServer = https.createServer(app)

const peerServer = ExpressPeerServer(httpServer, {
	allow_discovery: true,
	debug: true,
	proxied: true, //true / false
	path: '/peer',
	port: 443, //'' / 80 / 443
	secure: true, //true / false
	ssl: {}
})

app.use(peerServer)

httpServer.listen(port, () => {
	console.log(`http server is listening on : ${port}`);
})

/*httpsServer.listen(port, () => {
	console.log(`https server is listening on : ${port}`);
})*/
