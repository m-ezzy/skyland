Calls.prototype.call_end = function() {
	this.conn.close();

	this.call_incoming = '';
	this.call_outgoing = '';

	if (this.ar.srcObject) {
		stream_remote_audio = new MediaStream();
		this.ar.srcObject = new MediaStream();
		this.ar.srcObject.autoplay = false;
		this.ar.srcObject.muted = true;
	}
	if (this.vr.srcObject) {
		stream_remote_video = new MediaStream();
		this.vr.srcObject = new MediaStream();
		this.vr.srcObject.autoplay = false;
		this.vr.srcObject.muted = true;
	}

	this.menu.style.animationName = '';
	this.bce.style.display = "none";
}
