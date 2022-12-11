Calls.prototype.call_decline = async function(names, duo_id, user_id, call_type, time) {
	this.lic.removeChild(document.getElementById(`item_incoming_call_${names}_${duo_id}`))
	if(this.lic.childElementCount == 0) {
		this.lic.style.display = "none"
		this.menu.style.animationName = "";
	}

	if (names == "chats") {
		//add code to send message to caller person that call was declined
		//await this.conn[user_id].send(JSON.stringify({'purpose': 'call_decline'}))
		await this.calls[user_id].close()
		await this.conn[user_id].close()
		this.calls[user_id] = ""
		this.conn[user_id] = ""
	} else {
	}
}
