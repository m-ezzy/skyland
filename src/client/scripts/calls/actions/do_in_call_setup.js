import { stream_local } from "../get_permissions_audio_video"
import do_make_call from "./do_make_call"
import add_prev from "../items/add_prev"
import add_media from "../items/add_media"
import { isEmpty } from "../../tools"

export default function(names, conv_id, user_id, call_type, time) {
	this.current = {names: names, conv_id: conv_id, call_type: call_type}

	/*this.menu.style.animationPlayState = "running";*/
	this.e.menu.style.animationName = "call-indicator"
	this.e.header.classList.remove('hidden')
	this.e.media[(call_type == 'audio' ? 'video' : 'audio')].classList.add('hidden')
	this.e.media[(call_type)].classList.remove('hidden')
	this.e.sender.classList.remove('hidden')

	add_prev.call(this, names, {conv_id: conv_id, user_id: user_id, call_type: call_type, time_created: time, call_length: 1})

	if(names == 'chats') {
		console.log(conv_id)
		add_media.call(this, call_type, chats.conv[conv_id])
	} else {
		let members = groups.conv[conv_id].members
		delete members[account.current.user_id]
		console.log('----- calls - members = ', members)
		
		Object.entries(members).forEach(([user_id, user]) => {
			add_media.call(this, call_type, user)
			console.log(isEmpty(this.conn), Object.keys(this.conn))

			if (Object.keys(this.conn).includes(user_id)) {
				this.calls[user_id].answer(stream_local[call_type])
				console.log(this.calls[user_id])
			} else {
				do_make_call.call(this, names, conv_id, user_id, call_type)
				console.log('do make call ', names, user_id)
			}
		})
	}
}
