Calls.prototype.call_accept_chats = async function(chat_id, user_id, call_type) {
	//let data = await fetchs.calls.change_call_length_chats(chat_id, user_id, call_type, time);
	this.current.chat_id = chat_id

	if (call_type == "audio") {
		this.vlc.style.display = "none"
		this.alc.style.display = "flex"
		this.add_item_media_audio(chats.previous[chat_id])
	} else if (call_type == "video") {
		this.alc.style.display = "none"
		this.vlc.style.display = "flex"
		this.add_item_media_video(chats.previous[chat_id])
	}

	this.calls[user_id].answer(stream_local[call_type]);
	/*
	call_incoming.on('open', function() {
		//on call open
	});
	*/
	this.calls[user_id].on('stream', function(stream) {
		calls.event_on_call_stream(call_type, user_id, stream)
	})

	console.log(this.lic.hasChildNodes, "   ", this.lic.childElementCount)
	this.lic.removeChild(document.getElementById(`item_incoming_call_chats_${chat_id}`))
	if(this.lic.childElementCount == 0) {
		this.lic.style.display = "none"
	}

	/*this.menu.style.animationPlayState = "running";*/
	this.menu.style.animationName = "call-indicator"
	this.snm.style.display = "flex";
}
