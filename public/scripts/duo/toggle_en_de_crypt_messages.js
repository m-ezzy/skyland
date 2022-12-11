Duo.prototype.show_decrypted_media = function() {
	let key = this.tk.value;
	if (isNaN(key)) {
		return;
	}
	this.conversation[this.current].getElementsByClassName('received message').forEach(m => {
		m.innerHTML = decryption(m.innerHTML, key);
	});
}
