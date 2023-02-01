export default function() {
	if(this.encrypt_decrypt == 'decrypt') {
		Object.entries(document.getElementById(`conv_${this.names}_${this.current}`).getElementsByClassName('message')).forEach(([num, m]) => {
			m.textContent = messages[num].text
		})
		this.encrypt_decrypt = 'encrypt'
	} else {
		this.encrypt_decrypt = 'decrypt'
	}
	// this.encrypt_decrypt = (this.encrypt_decrypt == 'encrypt') ? 'decrypt' : 'encrypt'
	this.e.b.key.innerHTML = this.encrypt_decrypt
	this.e.b.key.setAttribute("data-tooltip", this.encrypt_decrypt)
	// this.bk.style.backgroundImage = `url('media/images/design/${this.encrypt_decrypt})`
	this.handle_input_key()
}
