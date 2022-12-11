Calls.prototype.call_accept_groups = function(group_id) {
	switch (this.call_incoming.metadata.call_type) {
	case 6 : 
		this.call_incoming.answer(stream_local_audio);
		break;
	case 7 : 
		this.call_incoming.answer(stream_local_video);
		break;
	}
	/*
	call_incoming.on('open', function() {
		//on call open
	});
	*/
	this.call_incoming.on('stream', function(stream) {
		switch (calls.call_incoming.metadata.call_type) {
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

	this.bca.style.display = "none";
	this.bcd.style.display = "none";
	this.bce.style.display = "grid";
}
