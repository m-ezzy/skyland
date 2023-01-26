Calls.prototype.make_call_chats = async function(call_type, chat_id, user_id) { //make_new_call_chats
	if (this.current.chat_id || this.current.group_id) {
		return
	}
	this.current.chat_id = chat_id

	switch (call_type) {
		case "audio" : {
			this.vlc.style.display = "none"
			this.alc.style.display = "flex"
			this.add_item_media_audio(chats.previous[chat_id])
			break
		}
		case "video" : {
			this.alc.style.display = "none"
			this.vlc.style.display = "flex"
			this.add_item_media_video(chats.previous[chat_id])
			break
		}
	}

	/*this.menu.style.animationPlayState = "running";*/
	this.menu.style.animationName = "call-indicator"
	this.snm.style.display = "flex"

	let data = await fetch_data(`calls/make_call/chats`, {chat_id: chat_id, user_id: user_id, call_type: call_type})

	this.connInterval = setTimeout(async () => {
		this.conn[user_id] = await peer.connect("murtaza-skyland-" + user_id + "")
		console.log(this.conn[user_id])

		if(this.conn[user_id]) {
			clearTimeout(this.connInterval)
			this.connInterval = ''

			calls.event_on_connection(this.conn[user_id])

			this.conn[user_id].on("data", function(data) {
				calls.event_on_data(JSON.parse(data))
			})
			this.conn[user_id].on("close", function() {
				calls.event_on_connection_close(user_id)
			})

			this.callInterval = setTimeout(async () => {
				this.calls[user_id] = await peer.call("murtaza-skyland-" + user_id + "", stream_local[call_type], {metadata: {
					"chat_or_group": "chat", "chat_id": chat_id, "user_id": getCookie("user_id"), "call_type": call_type
				}})

				if (this.calls[user_id]) {
					clearTimeout(this.callInterval)
					this.callInterval = ''

					this.calls[user_id].on("stream", function(stream) {
						calls.event_on_call_stream(call_type, user_id, stream)
					})
					this.calls[user_id].on('close', function() {
						calls.event_on_call_close(user_id)
					})
				}
			})
		}
	}, 1000);

	if (innerWidth <= configs.screen.mobile) {
		menu_bar.element.style.display = "none"
		this.bl.style.display = "none"
		this.bc.style.display = "grid"
	}
}
