import { content } from "../../index"
import { create_div, create_hero } from "../../elements"

export default function(names, {conv_id, user_id, call_type, time_created, call_length}) {
	let { conv_name, title, extension } = content.instances[names].conv[conv_id]

	let in_out = (user_id == account.current.user_id) ? "call_outgoing" : "call_incoming"
	let color = (call_length == 0) ? "bg-red" : "bg-green"
	let call_type_words = call_type
	if([6, 7].includes(call_type)) {
		call_type_words = (call_type == 6) ? "audio" : "video"
	}
	let click_handler = `calls.handle_click_call('${names}',${conv_id},'${call_type_words}')`
	
	let div = create_hero(names, conv_id, conv_name, title, extension, '', '')
	let time = create_div(`square time`, '', '', new Date(time_created).toUTCString())
	let in_out_div = create_div(`border square called_by ${in_out} ${color}`, '', '', '')
	let button_call = create_div(`border square button call ${call_type_words}`, '', click_handler, `${call_type_words} call`, true)

	div.appendChild(time)
	div.appendChild(in_out_div)
	div.appendChild(button_call)
	this.e.l.prev.getElementsByClassName("list")[(names == 'chats' ? 0 : 1)].appendChild(div)
}
