import { stream_local } from "../get_permissions_audio_video"
import add_incoming from "../items/add_incoming"
import do_setup_new_call from "../actions/do_setup_new_call"
import { PEER_PREFIX } from "../../peer-client"

//incoming_new_call
export default function(call) {
	// let user_id = call.metadata.peer.substring(PEER_PREFIX.length)
	let { names, conv_id, user_id, call_type } = call.metadata

	do_setup_new_call.call(this, user_id, call)
	
	if ( this.current && names == 'groups' && this.current.conv_id == conv_id) {
		//add directly to conv and accepting directly
		call.answer(stream_local[call_type])
	} else {
		this.e.menu.style.animationName = "call-indicator"
		this.e.l.ic.classList.remove('hidden')

		if (call.metadata.names == "chats") {
			add_incoming.call(this, 'chats', conv_id, user_id, call_type, Date.now())
		} else {
			if(document.getElementById(`incoming_${names}_${conv_id}`) == null) {
				add_incoming.call(this, 'groups', conv_id, user_id, call_type, Date.now())
			}
		}
	}
	/*
	const notification_call = new Notification('calls', { body: `incoming ${call_type_remote_words} call from ${o.first_name} ${o.last_name}`, icon: 'media/images/bg1.jpg'});
	notification_call.addEventListener('click', () => {
		//window.open('http://localhost:8000', '_blank');
		location.href += '';
	});
	*/
}
