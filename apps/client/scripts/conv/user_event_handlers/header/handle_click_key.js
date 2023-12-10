export default function() {
	this.e.b.key.innerHTML = this.encrypt_decrypt
	this.e.b.key.setAttribute("data-tooltip", this.encrypt_decrypt)
	// this.bk.style.backgroundImage = `url('media/images/design/${this.encrypt_decrypt})`

	if(this.encrypt_decrypt == 'decrypt') {
		let messages = []
		Object.entries(this.conv[this.current].media).forEach(([media_id, media]) => {
			if(media.media_type == 'message') {
				messages.push(media)
			}
		})
		Object.entries(this.e.l.media.getElementsByClassName('message')).forEach(([num, m]) => {
			m.textContent = messages[num].text
		})
		this.encrypt_decrypt = 'encrypt'
	} else {
		this.encrypt_decrypt = 'decrypt'
	}
	// this.encrypt_decrypt = (this.encrypt_decrypt == 'encrypt') ? 'decrypt' : 'encrypt'
	this.handle_input_key()
}
