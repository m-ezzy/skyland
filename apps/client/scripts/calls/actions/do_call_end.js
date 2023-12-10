export default async function() {
	if (this.current.names == 'chats') {
		let user_id = chats.conv[this.current.conv_id].user_id

		if (this.calls[user_id]) {
			await (this.calls[user_id])?.close()
		}
		if (this.conn[user_id]) {
			//await this.conn[user_id].send(JSON.stringify({'purpose': 'call_end', 'chat_id': this.current.chat_id, 'user_id': user_id}));
			await this.conn[user_id].close()
		}
	} else if (this.current.names == 'groups') {
		Object.values(this.calls).forEach(async (call) => {
			// clear interval / timeout if it has
			// else close the call
			await call.close()
		})
		Object.values(this.conn).forEach(async (conn) => {
			// clear interval / timeout if it has
			// else close the conn
			await conn.close()
		})
	}
	/*
	if (this.connInterval) {
		clearInterval(this.connInterval)
		this.connInterval = ''
	} else if(this.callInterval) {
		clearInterval(this.callInterval)
		this.callInterval = ''
	}*/
	this.current = 0
	this.conn = {}
	this.calls = {}

	if(this.e.l.ic.childElementCount == 0) {
		this.e.menu.style.animationName = ""
	}

	// clear header details and hide it
	
	Object.values(this.e.l.media.getElementsByClassName("remote media_calls")).forEach(e => {
		this.e.l.media.removeChild(e)
	})
	
	this.e.media.audio.classList.add('hidden')
	this.e.media.video.classList.remove('hidden')
	
	this.e.sender.classList.add('hidden')

	this.is_on.mic = false
	this.e.media.audio.muted = true
	this.e.media.video.muted = true
	this.e.b.mic.classList.remove('mic_on')
	this.e.b.mic.classList.add('mic_off')
	this.e.b.mic.setAttribute('data-tooltip', 'mic off')
	/*
	calls.vr.srcObject = new MediaStream();
	calls.vr.srcObject.autoplay = false;
	calls.vr.srcObject.muted = true;
	*/
}
