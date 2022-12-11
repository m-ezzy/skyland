Calls.prototype.get_previous = async function() {
	get_stream_local_audio()
	get_stream_local_video()
	//get_stream_local_only_video()

	let data = await fetchs(`calls/get_previous`, '')
	//this.previous = data.json
	this.lp.innerHTML = data.html

	/*
	this.lp.appendChild(create_div('flex wrapper border-bottom prev', '', '', ''))
	Object.entries(data.json.chats).forEach(([num, v]) => {
		this.add_item_previous_chats(v)
	})
	this.lp.appendChild(create_div('flex wrapper border-bottom prev', '', '', ''))
	Object.entries(data.json.groups).forEach(([group_id, v]) => {
		this.add_item_previous_groups(group_id, v)
	})
	*/
}
