import { PEER_PREFIX } from "../../peer-client"
import on_data from '../peer-events-handlers/on_data'
// import on_connection_close from "../peer-events-handlers/on_connection_close"

export default function(conn) {
	let user_id = conn.peer.substring(PEER_PREFIX.length)
	console.log('calls ----- conn = ', conn, ' - conn.peer = ', conn.peer, ' - user_id = ', user_id)

	this.conn[user_id] = conn

	conn.on("open", () => {
		console.log('connection open ', conn.peer)
	})
	conn.on("data", (data) => {
		console.log(data)
		on_data.call(this, data)
	})
	conn.on("close", () => {
		// fired when either side closes the connection
		console.log("connection closed with user_id - ", user_id)
		// on_connection_close.call(this, user_id)
	})
	conn.on("error", (error) => {
		console.log('connectio error. error = ', error)
	})
}
