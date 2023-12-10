import Peer from 'peerjs'
import { getCookie } from '../tools'

import configurations from '../../../../configurations.mjs'

import on_connection from '../calls/peer-events-handlers/on_connection'
// import on_connection_close from '../calls/on_connection_close'
import on_call from '../calls/peer-events-handlers/on_call'
// import on_call_stream from '../calls/on_call_stream'
// import on_call_close from '../calls/on_call_close'

/* peer   connection   call   data */

// export const PEER_PREFIX = 'murtaza-oca-' //skyland //''

// export function create_peer() {}
export const peer = new Peer(
	//getCookie('user_id') //cookieStore.get('user_id') //`${Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, 0)}` //undefined
	configurations.peer_server.PREFIX + getCookie('user_id'), {
	// secure: true,
	host: window.location.hostname, //"localhost", //"peer-server-1.herokuapp.com", //window.location.hostname, //3kxygyk88v.us-west-2.awsapprunner.com
	port: 9000, //window.location.port || (window.location.protocol === 'https:' ? 443 : 80), //80 //8000 //9000 //443
	path: "/peer", //peer //calls //phone
	debug: 2,
	// proxied: true,
	pingInterval: 5000,
})
//const peer = new Peer(getCookie('user_id'));
console.log(peer)
// console.log(window)
// console.log(window.peer)
window.peer = peer
// console.log(window)
// console.log(window.peer)
console.log(window.location.hostname)

peer.on("open", function (id) {
	console.log(`peer ----- on open, peer.open = ${peer.open}, peer.id = ${peer.id}, id = ${id}`)
})
// new connection by someone
peer.on("connection", function(conn) { //dataConnection
	on_connection.call(calls, conn)
})
// incoming call
peer.on("call", function(call) { //mediaConnection
	on_call.call(calls, call)
})
peer.on('close', function() {
	console.log('peer on close')
})
peer.on('disconnected', function() {
	console.log('peer on disconnected. internet gone maybe. peer.disconnected = ', peer.disconnected)
	peer.reconnect()
})
peer.on('error', function(err) {
	console.log(err.type, err)
})

export default 1
