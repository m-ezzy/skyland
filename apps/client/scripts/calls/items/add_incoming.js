//Calls.prototype.add_item_incoming_call_chats = function(chat_id, user_id, user_name, first_name, last_name, extension, call_type) {
// Calls.prototype.add_item_incoming_call_chats = function(names, conv_id, user_id, call_type, time) {
import { content } from '../../index'
import { create_div, create_hero } from '../../elements'

export default function(names, conv_id, user_id, call_type, time) {
	let { conv_name, title, extension } = content.instances[names].conv[conv_id]

	let div = create_hero(names, conv_id, conv_name, title, extension, `incoming_${names}_${conv_id}`, "")
	// div.classList.add('border', 'blur')
	let accept = create_div("flex button border square bg-green call_accept", "", `calls.handle_click_accept('${names}',${conv_id},${user_id},'${call_type}',${time})`, "accept", true)
	let decline = create_div("flex button border square bg-red call_decline", "", `calls.handle_click_decline('${names}',${conv_id},${user_id},'${call_type}',${time})`, "decline", true)

	div.appendChild(accept)
	div.appendChild(decline)
	this.e.l.ic.appendChild(div)
}
