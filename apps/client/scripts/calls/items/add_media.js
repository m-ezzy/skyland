import { create_div, create_hero } from '../../elements'

export default function(call_type, {user_id, conv_name, title, user_name, first_name, last_name, extension}) {
// OR
// Calls.prototype.add_item_media_video = function(chat_id) {
// let {user_id, user_name, first_name, last_name, extension} = chats.conv[chat_id]

	let div = create_div(`border media_calls remote media_calls_${call_type}`, "", "", "")
	let heading
	if(call_type == 'audio') {
		heading = create_hero('users', user_id, user_name, title, extension, '', '')
	} else {
		heading = create_div('border-b padding flex center-y', "", "", title)
	}

	let e = document.createElement(call_type)
	e.className = 'media_tag remote'
	e.id = `media_calls_${user_id}`
	e.setAttribute('autoplay', true)
	console.log(e.muted)
	e.muted = true
	console.log(e.muted)
	e.setAttribute('controls', true)
	// audio.width = "100%"
	// audio.height = "auto"
	// video.setAttribute('width', '100%')
	// video.setAttribute('height', 'auto')

	div.appendChild(heading)
	div.appendChild(e)
	this.e.l.media.appendChild(div)
}
