Calls.prototype.make_new_call = async function(chat_id, user_id, call_type) {
	// adding call log and getting remote peer id
	const response = await fetch(backEnd.pre + "calls/make_new_call" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: "chat_id=" + chat_id + "&user_id=" + user_id + "&call_type=" + call_type});
	let data = await response.json();
	console.log(data);

	this.peer_id_remote = data.peer_id;
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

	this.menu.style.animationName = "call-indicator";
	this.ch.getElementsByClassName("details")[0].innerHTML = document.getElementById(`prev_chats_${chat_id}`).innerHTML;
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
