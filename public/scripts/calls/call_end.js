Calls.prototype.call_end = async function() {
	if (this.current.chat_id) {
		let user_id = chats.previous[this.current.chat_id].user_id;
		console.log(user_id)
		console.log(this.calls[user_id])

		if (this.calls[user_id]) {
			await (this.calls[user_id]).close()
		}
		if (this.conn[user_id]) {
			//await this.conn[user_id].send(JSON.stringify({'purpose': 'call_end', 'chat_id': this.current.chat_id, 'user_id': user_id}));
			await this.conn[user_id].close();
		}
		this.current.chat_id = 0;
	} else if (this.current.group_id) {
		this.current.group_id = 0;
		
		Object.values(this.conn).forEach(c => {
			c.close();
		})
	}
	if (this.connInterval) {
		clearInterval(this.connInterval)
		this.connInterval = ''
	} else if(this.callInterval) {
		clearInterval(this.callInterval)
		this.callInterval = ''
	}
	this.conn = ""
	this.calls = ""
	this.snm.style.display = "none"
	this.alc.style.display = "none"
	this.vlc.style.display = "block"

	if(this.lic.childElementCount == 0) {
		this.menu.style.animationName = "";
	}

	/*Object.values(document.getElementsByClassName("remote")).forEach(i => {
		document.removeChild(i)
	})*/
	Object.values(document.getElementsByClassName("remote item_media_calls_audio")).forEach(i => {
		this.lc.removeChild(i)
	})
	Object.values(document.getElementsByClassName("remote item_media_calls_video")).forEach(i => {
		this.lc.removeChild(i)
	})

	/*
	calls.vr.srcObject = new MediaStream();
	calls.vr.srcObject.autoplay = false;
	calls.vr.srcObject.muted = true;
	*/
}
