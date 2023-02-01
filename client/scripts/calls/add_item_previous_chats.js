Calls.prototype.add_item_previous_chats = function({chat_id, user_id, call_type, time_created, call_length}) {
	let o = chats.conv[chat_id]

	let src = (o.extension == null) ? chats.place_holder : `data/icons/users/${o.user_id}.${o.extension}`
	let in_out = (user_id == account.current.user_id) ? "call_outgoing" : "call_incoming"
	let color = (call_length == 0) ? "bg-red" : "bg-green"
	let call_type_words = (call_type == 6) ? "audio" : "video"

	let div = create_div('padding flex col-gap border-b prev', '', '', '')
	let images = create_div('border square images', '', '', '')
	let img = create_image('', '', '', src, 'auto', 'auto')
	let text = create_div('', '', '', '')
	let fn = create_div('', '', '', `${o.first_name} ${o.last_name}`)
	let un = create_div('name', '', '', `@${o.user_name}`)
	let in_out_div = create_div(`border square called_by ${in_out} ${color}`, '', '', '')
	let button_call = create_div(`border square button call ${call_type_words}`, '', `calls.make_call_chats('${call_type_words}',${chat_id},${o.user_id})`, `${call_type_words} call`)

	button_call.setAttribute("data-tooltip", `${call_type_words} call`)

	images.appendChild(img)
	text.appendChild(fn)
	text.appendChild(un)
	div.appendChild(images)
	div.appendChild(text)
	div.appendChild(in_out_div)
	div.appendChild(button_call)
	this.lp.getElementsByClassName("list")[0].appendChild(div)
}
