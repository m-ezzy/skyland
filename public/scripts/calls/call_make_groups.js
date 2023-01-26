Calls.prototype.make_call_groups = async function(call_type, user_id, group_id, members) {
	if (this.current.chat_id || this.current.group_id) {
		return
	}
	this.current.group_id = group_id

	let data = await fetch_data(`calls/make_call/groups`, {group_id: group_id, call_type: call_type})

	add_item_video_container(un2)
	document.getElementsByClassName("controller")[0].style.visibility = "visible"

	let users
	if(Object.keys(conn).length == 0) {
		users = JSON.stringify([])
	} else {
		users = JSON.stringify(Object.keys(conn))
		currently_speaking = me.user_name
	}

	this.conn[un2] = peer.connect(un2)
	conn[un2].on("data", (data) => {
		console.log(data)
		handle_conn_data(data)
	})

	call_outgoing[un2] = peer.call(un2, stream_local, {metadata: {"user_name": getCookie("user_name"), "group_call_users": users, "add_me_directly": directly}})

	call_outgoing[un2].on('stream', function(stream) {
		document.getElementById("video_" + un2).srcObject = stream
	})







	

	this.conn = await peer.connect(data.peer_id);
	console.log(this.conn);

	let stream = new MediaStream();
	//stream = (call_type == 6) ? stream_local_audio : stream_local_video;
	switch (call_type) {
	case 6 : 
		stream = stream_local_audio;
		break;
	case 7 : 
		stream = stream_local_video;
		break;
	}

	this.call_outgoing = await peer.call(data.peer_id, stream, {metadata: {"chat_id": chat_id, "user_id": getCookie("user_id"), "call_type": call_type}});
	console.log(this.call_outgoing);
	this.call_outgoing.on('stream', function(stream) {
		switch (call_type) {
		case 6 : 
			stream_remote_audio = stream;
			calls.ar.srcObject = stream;
			break;
		case 7 : 
			stream_remote_video = stream;
			calls.vr.srcObject = stream;
			break;
		}
	});

	/*this.menu.style.animationPlayState = "running";*/
	this.menu.style.animationName = "call-indicator";

	this.bce.style.display = "grid";

	switch (call_type) {
	case 6 : 
		this.ar.autoplay = true;
		this.ar.muted = false;

		this.ar.style.display = 'grid';
		this.vl.style.display = 'none';
		this.vr.style.display = 'none';
		break;
	case 7 : 
		this.vr.autoplay = true;
		this.vr.muted = false;

		this.ar.style.display = 'none';
		this.vl.style.display = 'grid';
		this.vr.style.display = 'grid';
		break;
	}

	if (innerWidth <= screen_mobile) {
		menu_bar.element.style.display = "none";
		this.bl.style.display = "none";
		this.bc.style.display = "grid";
	}
}
