Groups.prototype.handle_click_button_back = function() {
	this.ls.style.display = 'none';
}
Groups.prototype.handle_input_text_search = function() {
	this.search();
}
Groups.prototype.handle_click_button_search = function() {
	this.search();
}
Groups.prototype.handle_click_search_previous = async function(group_id) {   //take_to_previous //search_previous
	this.ls.style.display = 'none'
	await this.handle_click_prev(group_id)
}
Groups.prototype.handle_click_create_new = async function() {
	let title = this.ls.getElementsByClassName("text title")[0].value
	if(title == '') { return }
	this.ls.style.display = 'none'
	let data = await fetchs(`${this.names}/create_new`, {group_name: this.ts.value, title: title})   //`group_name=${this.ts.value}&title=${title}`
	this.previous[data.group_id] = data.value
	//this.previous[group_id] = {'group_name': group_id, 'group_name': group_name, 'title': title, 'extension': extension, 'row_up': 0, 'row_down': row_down};

	await this.add_item_previous(data.group_id, data.value)
	await this.add_item_conv(data.group_id)
	await this.handle_click_prev(data.group_id)
}
Groups.prototype.handle_click_prev = function(group_id) {
	if ( this.current == group_id ) {return}
	if (this.current) {
		document.getElementById(`prev_groups_${this.current}`).style.backgroundColor = 'var(--bg-eb)'
		document.getElementById(`conv_groups_${this.current}`).style.display = 'none'
	}
	this.current = group_id;
	document.getElementById(`prev_groups_${group_id}`).style.backgroundColor = 'var(--item-bg)'
	document.getElementById(`conv_groups_${group_id}`).style.display = 'block'

	this.di.src = (this.previous[group_id].extension) ? `data/icons/groups/${group_id}.${this.previous[group_id].extension}` : this.place_holder
	this.dt.innerHTML = `<div>${this.previous[group_id].title}</div><div class='trio_name'>@${this.previous[group_id].group_name}</div>`

	if(this.previous[this.current].row_up <= 0) {return}
	this.history_conv(group_id)
}
Groups.prototype.handle_click_details = function() {   //shows the member bar
	if (this.barm.style.display == 'flex') {
		this.barm.style.display = 'none'
	} else {
		this.barm.style.display = "flex";
		this.lmem.innerHTML = "";

		Object.entries(this.previous[this.current].members).forEach(([user_id, v]) => {
			this.add_item_member(user_id, v);
		});
	}
}
Groups.prototype.handle_click_add_member = async function() {   //add_member //join
	let data = await fetchs(`${this.names}/add_member`, {group_id: this.current, user_id: this.tam.value})   //`group_id=${this.current}&user_id=${this.tam.value}`
	this.previous[this.current].members[this.tam.value] = data.value
	this.add_item_member(this.tam.value, data.value)
}
Groups.prototype.handle_click_call = async function(call_type) {
	await calls.handle_click_menu();
	await calls.make_call_groups(call_type, this.current, this.previous[this.current].members);
}
Groups.prototype.handle_input_text_key = function() {
	this.decrypt_messages()
}
Groups.prototype.handle_click_button_key = function() {
	this.toggle_encrypt_decrypt()
}
Groups.prototype.handle_click_leave = async function() {
	console.log(this, this.current)
	let group_id = this.current
	let data = await fetchs(`groups/leave`, {group_id: group_id})   //`group_id=${this.current}`
	document.removeChild(document.getElementById(`prev_${this.names}_${this.current}`))
	document.removeChild(document.getElementById(`conv_${this.names}_${this.current}`))
	this.previous[this.current] = {}
	this.lmem.innerHTML = ''
	this.lmem.style.display = 'none'
	//also emmit event to leave this socket.io room
}
Groups.prototype.handle_scroll_conv = function(group_id) {
	if (document.getElementById(`conv_groups_${group_id}`).scrollTop != 0) {return}
	if (last_known == 0) {return}
	if (this.previous[this.current].row_up <= 0) {return}
	this.history_conv(group_id);
}
Groups.prototype.handle_focus_text_message = function() {
	document.addEventListener("keyup", groups.handle_keyup_send_message);
}
Groups.prototype.handle_blur_text_message = function() {
	document.removeEventListener("keyup", groups.handle_keyup_send_message);
}
Groups.prototype.handle_click_send_message = async function(group_id = this.current, message = this.tm.value, key = this.tk.value) {
	if ([message, key].includes('')) {
		return
	}
	let encrypted_message = encryption(message, key)
	let data = await fetchs(`groups/send_message`, {group_id: group_id, encrypted_message: encrypted_message})   //`group_id=${group_id}&encrypted_message=${encrypted_message}`
	this.previous[group_id].row_down = data.group_media_id
	this.add_item_media(group_id, me.user_id, data.group_media_id, 0, message)
	socket[this.names].emit('send-message', {'group_id': group_id, 'user_id': me.user_id, "media_id": data.group_media_id, 'encrypted_message': encrypted_message})
}
/*
let handle = {
	keyup: {},
}*/
Groups.prototype.handle_keyup_send_message = async function(e) {
	if(e.key == "Enter") {
		this.handle_click_send_message();
	}
}
