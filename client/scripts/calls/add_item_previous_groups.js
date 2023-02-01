Calls.prototype.add_item_previous_groups = function({group_id, group_name, title, extension, user_id, call_type, time_created, call_length}) {
	let o = groups.conv[group_id]

	let src = (o.extension == null) ? groups.place_holder : `data/icons/groups/${group_id}.${o.extension}`
	let in_out = (user_id == account.current.user_id) ? "call_outgoing" : "call_incoming"
	let color = (call_length == 0) ? "bg-red" : "bg-green" //call_missed call_accepted
	let call_type_words = (call_type == 6) ? "audio" : "video"

	let div = create_div('padding flex col-gap border-b prev', '', '', '')
	let images = create_div('border square images', '', '', '')
	let img = create_image('', '', '', src, 'auto', 'auto')
	let text = create_div('', '', '', '')
	let ti = create_div('', '', '', title)
	let gn = create_div('name', '', '', `@${group_name}`)
	let in_out_div = create_div(`called_by ${in_out} ${color}`, '', '', '')
	let button_call = create_div(`button call ${call_type_words}`, '', `calls.make_call_groups('${call_type_words}',${group_id})`, call_type_words)

	images.appendChild(img)
	text.appendChild(ti)
	text.appendChild(gn)
	div.appendChild(images)
	div.appendChild(text)
	div.appendChild(in_out_div)
	div.appendChild(button_call)
	this.lp.getElementsByClassName("list")[1].appendChild(div)
}
