import { stream_local } from "../get_permissions_audio_video"
import { PEER_PREFIX, peer } from "../../peer-client"
import do_setup_new_conn from "./do_setup_new_conn"
import do_setup_new_call from "./do_setup_new_call"

export default function(names, conv_id, user_id, call_type) {
	let connInterval = setTimeout(async () => {
		let conn = await peer.connect(PEER_PREFIX + user_id)
		if(conn) {
			clearTimeout(connInterval)
			// this.connInterval = ''
			do_setup_new_conn.call(this, conn)

			let callInterval = setTimeout(async () => {
				let call = await peer.call(PEER_PREFIX + user_id, stream_local[call_type], {metadata: {
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
