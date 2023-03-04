import { fetch_data } from '../api-client'
import add_prev from './items/add_prev'
import { get_stream_local_audio, get_stream_local_video, stream_local } from "./get_permissions_audio_video"

export default async function() {
	get_stream_local_audio()
	get_stream_local_video()
	// get_stream_local_only_video()

	this.e.local.video.setAttribute('id', `media_calls_${account.current.user_id}`)

	let data = await fetch_data(`/calls/get_history`, {})
	this.conv = data

	if(data.chats.length) {
		this.e.l.prev.getElementsByClassName("section")[0].classList.remove("hidden")
		data.chats.forEach(v => {
			if(chats.conv[v.conv_id]) {
				add_prev.call(this, 'chats', v)
			}
		})
	}
	if(data.groups.length) {
		this.e.l.prev.getElementsByClassName("section")[1].classList.remove("hidden")
		data.groups.forEach(v => {
			if(groups.conv[v.conv_id]) {
				add_prev.call(this, 'groups', v)
			}
		})
	}
}
