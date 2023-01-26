Duo.prototype.handle_input_key = function() {
	let key = this.tk.value
	// let messages = JSON.parse(sessionStorage.getItem(`chats_messages_${this.current}`))
	let messages = []
	Object.values(this.previous[this.current].media).forEach(media => {
		if(media.media_type == 'message') {
			messages.push(media.text)
		}
	})
	if (this.encrypt_decrypt == 'decrypt') {
		Object.entries(document.getElementById(`conv_${this.names}_${this.current}`).getElementsByClassName('message')).forEach(([num, m]) => {
			if (key == '') {
				m.textContent = messages[num]
			} else {
				m.textContent = decryption(messages[num], key)
			}
		})
	} /* else if (this.encrypt_decrypt == 'encrypt') {
		m.textContent = encryption(messages[num].text, this.tk.value)
	}*/
}
