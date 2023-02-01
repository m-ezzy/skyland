/*
Trio.prototype.handle_click_back = function() {
	this.ls.classList.add('hidden')
}
Trio.prototype.handle_click_search = function() {
	this.handle_input_search()
}
Trio.prototype.handle_click_search_previous = function(conv_id) { //take_to_previous //search_previous
	// this.ls.classList.add('hidden')
	this.handle_click_button_back()
	this.handle_click_prev(conv_id)   //show_conversation //handle_click_prev
}*/
export let handle_click_back = function() {
	this.e.l.search.classList.add('hidden') //toggle //add
	this.e.l.prev.classList.remove('hidden')
}
export let handle_click_search = function() {
	this.handle_input_search()
}
export let handle_click_search_previous = function(conv_id) { //take_to_previous //search_previous
	this.handle_click_back()
	this.handle_click_prev(conv_id)   //show_conversation //handle_click_prev
}
/*
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
}*/
export let handle_change_icon = function() {
	this.e.info.i.src = URL.createObjectURL(this.e.f.icon.files[0])
	this.e.b.icon.classList.add('hidden')
}
