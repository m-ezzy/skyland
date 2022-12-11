Chats.prototype.handle_click_button_back = function() {
	this.ls.style.display = 'none';
}
Chats.prototype.handle_input_text_search = function() {
	this.search();
}
Chats.prototype.handle_click_button_search = function() {
	this.search();
	/*
	this.ls.innerHTML = "";
	this.search_previous();
	this.search_new();
	*/
}
Chats.prototype.handle_click_search_previous = async function(chat_id) {
	this.ls.style.display = 'none'
	await this.handle_click_prev(chat_id)   //show_conversation //handle_click_prev
}
Chats.prototype.handle_click_create_new = async function(user_id, user_name, first_name, last_name, extension) {
	this.ls.style.display = 'none';
	let {status, chat_id, row_down} = await fetchs(`chats/create_new`, {user_id: user_id})   //`user_id=${user_id}`
	this.previous[chat_id] = {'user_id': user_id, 'user_name': user_name, 'first_name': first_name, 'last_name': last_name, 'extension': extension, 'row_up': 0, 'row_down': row_down};

	await this.add_item_previous(chat_id, this.previous[chat_id]);
	await this.add_item_conv(chat_id);
	await this.handle_click_prev(chat_id);
}
Chats.prototype.handle_click_prev = async function(chat_id) {
	if ( this.current == chat_id ) {return}
	if (this.current) {
		document.getElementById(`prev_chats_${this.current}`).style.backgroundColor = 'var(--bg-eb)'
		document.getElementById(`conv_chats_${this.current}`).style.display = 'none'
	}
	this.current = chat_id
	document.getElementById(`prev_chats_${chat_id}`).style.backgroundColor = 'var(--item-bg)'
	document.getElementById(`conv_chats_${chat_id}`).style.display = 'block'

	this.di.src = (this.previous[chat_id].extension) ? `data/icons/users/${this.previous[chat_id].user_id}.${this.previous[chat_id].extension}` : this.place_holder
	this.dt.innerHTML = `<div>${this.previous[chat_id].first_name} ${this.previous[chat_id].last_name}</div><div class='trio_name'>@${this.previous[chat_id].user_name}</div>`

	if (this.previous[this.current].row_up <= 0) {return}
	await this.history_conv(chat_id)

	/*
	if (innerWidth <= 400) {
		menu_bar.element.style.display = 'none';
		this.bl.style.display = 'none';
		this.bc.style.display = 'grid';
	}*/
	//this.nmi[this.current].style.backgroundColor = 'rgb(0, 0, 0, 0)';
	//this.nmi[this.current].innerHTML = '';

	/*
	if (this.previous[this.current].row_up != -1) {
		return;
	}
	this.previous[this.current].row_up = 0;
	*/
}
Chats.prototype.handle_click_call = async function(call_type) {
	await calls.handle_click_menu();
	await calls.make_call_chats(call_type, this.current, this.previous[this.current].user_id);
}
Chats.prototype.handle_input_text_key = function() {
	//this.decrypt_messages();
	let messages = JSON.parse(sessionStorage.getItem(`chats_messages_${this.current}`))
	console.log(messages[0])

	Object.entries(document.getElementById(`conv_${this.names}_${this.current}`).getElementsByClassName('msg')).forEach(([num, m]) => {
		m.textContent = encryption(messages[num].text, this.tk.value)
	});
}
Chats.prototype.handle_click_button_key = function() {
	this.toggle_encrypt_decrypt()
}
Groups.prototype.handle_click_leave = async function() {
	let data = await fetchs(`${this.names}/leave`, {chat_id: this.current})   //`chat_id=${this.current}`
	document.removeChild(document.getElementById(`prev_${this.names}_${this.current}`))
	document.removeChild(document.getElementById(`conv_${this.names}_${this.current}`))
	this.previous[this.current] = {}
	//also emmit event to leave this socket.io room
}
Chats.prototype.handle_scroll_conv = async function(chat_id) {
	if (document.getElementById(`conv_chats_${chat_id}`).scrollTop != 0) {return}
	if (last_known == 0) {return}
	if (this.previous[this.current].row_up <= 0) {return}
	await this.history_conv(chat_id);
}
Chats.prototype.handle_focus_text_message = function() {
	document.addEventListener("keyup", chats.handle_keyup_send_message)
}
Chats.prototype.handle_blur_text_message = function() {
	document.removeEventListener("keyup", chats.handle_keyup_send_message)
}
Chats.prototype.handle_click_send_message = async function(message = this.tm.value, key = this.tk.value, chat_id = this.current) {
	//this.send_message();
	if ([message, key].includes('')) {
		return
	}
	let user_id2 = this.previous[this.current].user_id
	let encrypted_message = encryption(message, key)
	let data = await fetchs(`chats/send_message`, {chat_id: this.current, encrypted_message: encrypted_message})   //`chat_id=${this.current}&encrypted_message=${encrypted_message}`
	this.previous[this.current].row_down = data.chat_media_id
	this.add_item_media(chat_id, me.user_id, data.chat_media_id, 0, message)
	socket[this.names].emit('send-message', {'chat_id': chat_id, 'user_id': me.user_id, "media_id": data.chat_media_id, 'encrypted_message': encrypted_message})
}
/*
let handle = {
	keyup: {},
};*/
Chats.prototype.handle_keyup_send_message = async function(e) {
	if(e.key == "Enter") {
		console.log(this)
		await chats.handle_click_send_message()
	}
}

/*
chats.select_images() = function {
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
chats.handle_click_select_canvas() {
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
