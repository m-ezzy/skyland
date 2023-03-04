// import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from "express"
import { createServer } from 'http'
// import { createServer } from 'https'
// import process from 'process'
// import cors from 'cors'

import allRouter from './routes/all.js'

const port = process.env.PORT || "8000"
const app = express()
const http_server = createServer(app)
/*
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
})*/

let origin =
	process.env.NODE_ENV === "production" ? 
		process.env.FRONTEND_PROD_URL :   // http://www.skyland.com
		process.env.FRONTEND_LOCAL_URL;   // http://localhost:5173
origin = 'http://localhost:5173';
// origin = 'http://192.168.15.42:5173';

app.use((req, res, next) => {
	// console.log(req.method)
	// console.log(req.headers)
  res.header("Access-Control-Allow-Origin", origin)
  // res.setHeader("access-control-allow-origin", 'http://localhost:5173')
  res.header("Access-Control-Allow-Headers", 'access-control-allow-origin,content-type')
  res.header("Access-Control-Allow-Credentials", true)

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})

// app.use(cors({credentials: true, origin: 'http://localhost:5173'}))

// import socket_server from './socket-server.js'
// socket_server(http_server)

/*
import { PeerServer } from 'peer'
const peerServer = PeerServer({
	// proxied: true,
	debug: true,
	path: '/peer',
	port: 9000, //80 //443 //8000 //8002 //9000
	//ssl: {}
})
app.use(peerServer)
*/
/*
import { ExpressPeerServer } from 'peer'
const peerServer = ExpressPeerServer(http_server, {
	// proxied: true, //true //false
	debug: true,
	path: '/peer', //peer //myapp
	// port: 9000,
	// ssl: {}
})
app.use(peerServer)
// app.use("/peerjs", peerServer)
*/

app.use(cookieParser())

// Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded( {extended: true} ));
// Parse JSON bodies (as sent by API clients)
app.use(express.json())
// parse multi part form data
// app.use(express.multipart());

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())

app.set('views', process.cwd() + '/views')
app.set('view engine', 'ejs')

// console.log(process.cwd())
// app.use(express.static(process.cwd() + '\public'))
app.use('/', allRouter)
/*
app.listen(port, (httpServer, err) => {
	console.log(httpServer, err)
})*/

http_server.listen(port, () => { //, '0.0.0.0'
	console.log(`server is listening on port ${port}`)
})
