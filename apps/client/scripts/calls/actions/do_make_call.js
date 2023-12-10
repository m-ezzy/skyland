import { stream_local } from "../get_permissions_audio_video"
import { peer } from "../../clients/peer-client"
import do_setup_new_conn from "./do_setup_new_conn"
import do_setup_new_call from "./do_setup_new_call"

import configurations from "../../../../configurations.mjs"

export default function(names, conv_id, user_id, call_type) {
	let connInterval = setTimeout(async () => {
		let conn = await peer.connect(configurations.peer_server.PREFIX + user_id)
		
		// conn.on('open', ) //use this instead of making your own interval. use library methods first
		console.log(conn.open)
		if(conn) {
			clearTimeout(connInterval)
			// this.connInterval = ''
			do_setup_new_conn.call(this, conn)

			let callInterval = setTimeout(async () => {
				let call = await peer.call(configurations.peer_server.PREFIX + user_id, stream_local[call_type], {metadata: {
					names: names, conv_id: conv_id, user_id: account.current.user_id, call_type: call_type
				}})
				if (call) {
					clearTimeout(callInterval)
					// this.callInterval = ''
					do_setup_new_call.call(this, user_id, call)
				}
			}, 1000)
		}
	}, 100)
}
