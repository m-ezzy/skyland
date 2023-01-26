Trio.prototype.handle_click_back = function() {
	this.ls.classList.add('hidden')
}
Trio.prototype.handle_click_search = function() {
	this.handle_input_search()
}
Trio.prototype.handle_click_info = function() {   //info details
	let url = `/${this.names}/${this.previous[this.current].conv_name}`
	if (this.bari.classList.contains('hidden')) {
		url += '/info'
	}
	this.bari.classList.toggle('hidden')
	history.pushState('', '', url)
}
Trio.prototype.handle_click_files = async function(e) {
	// this.button_files.click()
}
Trio.prototype.handle_focus_text_message = function() {
	let func = this.handle_keyup_send_message
	document.addEventListener("keyup", func)
}
Trio.prototype.handle_blur_text_message = function() {
	let func = this.handle_keyup_send_message
	document.removeEventListener("keyup", func)
}
Trio.prototype.handle_keyup_send_message = async function(e) {
	if(e.key == "Enter") {
		this.handle_click_send()
	}
}
Trio.prototype.handle_change_icon = function() {
	this.i_i.src = URL.createObjectURL(this.i_i_f.files[0])
	this.i_i_b.classList.add('hidden')
}
