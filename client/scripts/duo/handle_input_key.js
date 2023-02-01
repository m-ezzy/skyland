import { decryption } from "../privacy"

export default function() {
	let conv_id = this.current
	let key = this.e.t.key.value
	this.keys.set(conv_id, key)
	// let messages = JSON.parse(sessionStorage.getItem(`chats_messages_${this.current}`))
	let messages = []
	// console.log(this.media.get(conv_id).values())
	// this.media.get(conv_id).forEach((media, media_id) => {
	Object.values(this.conv[this.current].media).forEach(media => {
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
