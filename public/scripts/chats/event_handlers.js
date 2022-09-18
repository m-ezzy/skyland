chats.handle_click_button_back = function() {
	this.ls.style.display = 'none';
}
chats.handle_input_text_search = function() {
	this.ls.innerHTML = "";
	this.search_previous();
	this.search_new();
}
chats.handle_click_button_search = function() {
	this.ls.innerHTML = "";
	this.search_previous();
	this.search_new();
}
chats.handle_click_take_to_previous = async function(t, chat_id) {
	this.ls.style.display = 'none';
	this.show_conversation(t, chat_id);
}
chats.handle_click_create_new = async function(...r) {
	console.log(r);
	console.log(...r);
	this.ls.style.display = 'none';
	let o = await this.create_new(...r);
	await this.add_to_previous(o);
	await this.show_conversation(this.lp.lastElementChild, (Object.keys(o))[0]);
}
chats.handle_click_prev = function(t, chat_id) {
	this.show_conversation(t, chat_id);
	if (this.previous[this.current].row_up <= 0) { return; }
	this.history_conv(chat_id);
}
chats.handle_click_call = async function(call_type) {
	await calls.handle_click_menu();
	await calls.make_new_call(this.current, this.previous[this.current].user_id, call_type);
}
chats.handle_input_text_key = function() {
	chats.decrypt_messages();
}
chats.handle_scroll_conv = function(chat_id) {
	if (document.getElementById(`conv_chats_${chat_id}`).scrollTop != 0) { return; }
	if (last_known == 0) { return; }
	if (this.previous[this.current].row_up <= 0) { return; }
	this.history_conv(chat_id);
}
chats.handle_focus_text_message = function() {
	document.addEventListener("keyup", handle_keyup_send_message);
}
chats.handle_blur_text_message = function() {
	document.removeEventListener("keyup", handle_keyup_send_message);
}
chats.handle_click_send_message = function() {
	this.send_message();
}
/*
let handle = {
	keyup: {},
};*/
let handle_keyup_send_message = function(e) {
	if(e.key == "Enter") {
		chats.send_message();
	}
}

/*
chats.select_images() {
	//document.getElementById("select_images").click();
	Chats_Groups.sending[0].getElementsByClassName("select_images")[0].click();
	document.getElementsByClassName("sending")[0].style.visibility = "visible";
}
chats.select_videos() {
	//document.getElementById("select_videos").click();
	Chats_Groups.element.getElementsByClassName("select_videos")[0].click();
	document.getElementsByClassName("sending")[1].style.visibility = "visible";
}
chats.select_audios() {
	//document.getElementById("select_audios").click();
	Chats_Groups.element.getElementsByClassName("select_audios")[0].click();
	document.getElementsByClassName("sending")[2].style.visibility = "visible";
}
chats.select_documents() {
	//document.getElementById("select_documents").click();
	Chats_Groups.element.getElementsByClassName("select_documents")[0].click();
	document.getElementsByClassName("sending")[3].style.visibility = "visible";
}
chats.select_location() {
	//document.getElementById("select_location").click();
	Chats_Groups.element.getElementsByClassName("select_location")[0].click();
	document.getElementsByClassName("sending")[4].style.visibility = "visible";
}

close_images() {
	document.getElementsByClassName("sending")[0].style.visibility = "hidden";
}
close_videos() {
	document.getElementsByClassName("sending")[1].style.visibility = "hidden";
}
close_audios() {
	document.getElementsByClassName("sending")[2].style.visibility = "hidden";
}
close_documents() {
	document.getElementsByClassName("sending")[3].style.visibility = "hidden";
}
close_location() {
	document.getElementsByClassName("sending")[4].style.visibility = "hidden";
}
*/
