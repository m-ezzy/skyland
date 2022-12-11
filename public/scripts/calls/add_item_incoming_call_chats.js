//Calls.prototype.add_item_incoming_call_chats = function(chat_id, user_id, user_name, first_name, last_name, extension, call_type) {
Calls.prototype.add_item_incoming_call_chats = function(chat_id, user_id, call_type, time) {
	let o = chats.previous[chat_id]

	let div = create_div("flex center wrapper border", "item_incoming_call_chats_" + chat_id, "", `${o.first_name} ${o.last_name}`)
	let accept = create_div("flex button border square green call_accept", "", `calls.call_accept_chats(${chat_id},${user_id},'${call_type}',${time})`, "accept")
	let decline = create_div("flex button border square red call_decline", "", `calls.call_decline("chats", ${chat_id},${user_id},'${call_type}',${time})`, "decline")

	div.appendChild(accept)
	div.appendChild(decline)
	this.lic.appendChild(div)
}
