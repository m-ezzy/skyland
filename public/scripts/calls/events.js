/* peer   connection   call   data */

Calls.prototype.event_on_connection = function(conn) {
	console.log(conn.peer, conn)

	let user_id = conn.peer.substring(16);
	calls.conn[user_id] = conn;
}
Calls.prototype.event_on_data = function(data) {
	console.log(data)

	if (data.purpose == "mic") {
	} else if (data.purpose == "canvas") {
	}
}
Calls.prototype.event_on_call = function(call) {   //incoming_new_call
	this.calls[call.metadata.user_id] = call
	console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")

	if (this.current.group_id && this.current.group_id == call.metadata.group_id) {
		//call.answer(stream_local_video)
		//add directly to conv
	} else {
		this.menu.style.animationName = "call-indicator"
		this.lic.style.display = "flex"

		if (call.metadata.chat_or_group == "chat") {
			this.add_item_incoming_call_chats(call.metadata.chat_id, call.metadata.user_id, call.metadata.call_type, Date.now())
		} else if (call.metadata.chat_or_group == "group") {
			this.add_item_incoming_call_groups(call.metadata.group_id, call.metadata.made_by, call.metadata.call_type, Date.now())
		}
	}
	/*
	const notification_call = new Notification('calls', { body: `incoming ${call_type_remote_words} call from ${o.first_name} ${o.last_name}`, icon: 'media/images/bg1.jpg'});
	notification_call.addEventListener('click', () => {
		//window.open('http://localhost:8000', '_blank');
		location.href += '';
	});
	*/
}
Calls.prototype.event_on_call_stream = function(call_type, user_id, stream) {
	document.getElementById(`${call_type}_${user_id}`).srcObject = stream
}
Calls.prototype.event_on_call_close = function(user_id) {
	console.log('call on close ' + user_id)
}
Calls.prototype.event_on_connection_close = function(user_id) {
	console.log(user_id)

	if (chats.previous[this.current.chat_id].user_id == user_id) {
		this.current.chat_id = 0;
		this.call_end();
		console.log("call end end");
	} else {
		//calls.calls[user_id].close()
		//conn.calls[user_id].close()
		calls.calls[user_id] = ''
		conn.conn[user_id] = ''
		if(this.lic.childElementCount == 0) {
			this.lic.style.display = "none"
			this.menu.style.animationName = '';
		}
		this.lic.removeChild(document.getElementById(`item_incoming_call_chats_${data.chat_id}`))
		console.log("call end early")
	}
}
