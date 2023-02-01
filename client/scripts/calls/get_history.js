Calls.prototype.get_history = async function() {
	get_stream_local_audio()
	get_stream_local_video()
	//get_stream_local_only_video()

	let data = await fetch_data(`calls/get_history`, '')
	this.conv = data

	if(data.chats.length) {
		this.lp.getElementsByClassName("section")[0].classList.remove("hidden")
		data.chats.forEach(v => {
			this.add_item_previous_chats(v)
		})
	}
	if(data.groups.length) {
		this.lp.getElementsByClassName("section")[1].classList.remove("hidden")
		data.groups.forEach(v => {
			this.add_item_previous_groups(v)
		})
	}
}
