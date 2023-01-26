Channels.prototype.handle_input_text_search = function() {
	this.search()
}
Channels.prototype.handle_click_button_search = function() {
	this.search()
}
Channels.prototype.handle_click_search_previous = async function(channel_id) {   //take_to_previous //search_previous
	this.ls.classList.add("hidden")
	await this.handle_click_prev(channel_id)
}
Channels.prototype.handle_click_join = async function(channel_id) {
	this.ls.classList.add("hidden")
	let data = await fetch_data(`channels/join`, {channel_id: channel_id})
	this.previous[channel_id] = data.value

	this.add_item_previous(channel_id, data.value, 2)
	this.add_item_conv(channel_id)
	this.handle_click_prev(channel_id)
}
Channels.prototype.handle_click_create = async function() {
	let title = this.ls.getElementsByClassName("text title")[0].value
	if(title == '') { return }
	this.ls.classList.add("hidden")
	let data = await fetch_data(`${this.names}/create`, {channel_name: this.ts.value, title: title})   //`channel_name=${this.ts.value}&title=${title}`

	this.previous[data.channel_id] = {
		channel_name: this.ts.value,
		title: title,
		extension: null,
		row_up: 0,
		members: {
			[me.user_id]: {
				//...me,
				user_name: me.user_name,
				first_name: me.first_name,
				last_name: me.last_name,
				extension: me.extension,
				member_type: "founder"
			}
		}
	}
	this.add_item_previous(data.channel_id, {channel_name: this.ts.value, title: title, extension: null}, 0)
	this.add_item_conv(data.channel_id)
	await this.handle_click_prev(data.channel_id)
}
Channels.prototype.handle_click_prev = async function(channel_id) {
	if (this.current == channel_id) {return}
	history.pushState('', '', `/channels/${this.previous[channel_id].channel_name}`)
	if (this.current) {
		document.getElementById(`prev_${this.names}_${this.current}`).style.backgroundColor = 'var(--bg-eb)'
		document.getElementById(`conv_${this.names}_${this.current}`).style.display = 'none'
	}
	this.current = channel_id
	document.getElementById(`prev_channels_${channel_id}`).style.backgroundColor = 'var(--item-bg)'
	document.getElementById(`conv_channels_${channel_id}`).style.display = 'block'

	document.getElementById(`nmi_channels_${channel_id}`).innerHTML = ''

	this.di.src = (this.previous[channel_id].extension) ? `data/icons/channels/${channel_id}.${this.previous[channel_id].extension}` : this.place_holder
	this.dt.innerHTML = `<div>${this.previous[channel_id].title}</div><div class='name'>@${this.previous[channel_id].channel_name}</div>`

	if(this.previous[channel_id].members[me.user_id].member_type == "regular") {
		if(this.snm.classList.contains("hidden") == false) {
			this.snm.classList.add("hidden")
		}
	} else {
		if(this.snm.classList.contains("hidden")) {
			this.snm.classList.remove("hidden")
		}
	}

	if (this.bari.classList.contains('hidden') == false) {
		this.refresh_info_bar()
	}
	if (this.previous[this.current].row_up == 0) {return}
	await this.previous_media(channel_id)
}
Channels.prototype.handle_scroll_conv = function(channel_id) {
	if (document.getElementById(`conv_channels_${channel_id}`).scrollTop != 0) {return}
	if (last_known == 0) {return}
	if (this.previous[this.current].row_up <= 0) {return}
	this.previous_media(channel_id);
}
Channels.prototype.handle_focus_text_message = function() {
	document.addEventListener("keyup", channels.handle_keyup_send_message)
}
Channels.prototype.handle_blur_text_message = function() {
	document.removeEventListener("keyup", channels.handle_keyup_send_message)
}
Channels.prototype.handle_click_send = async function(channel_id = this.current, message = this.tm.value, key = this.tk.value) {
	if ([message, key].includes('')) {
		return
	}
	let encrypted_message = encryption(message, key)
	let data = await fetch_data(`channels/send_message`, {channel_id: channel_id, message: message})   //`channel_id=${channel_id}&encrypted_message=${encrypted_message}`
	this.previous[channel_id].row_down = data.channel_media_id
	this.add_item_media(channel_id, me.user_id, data.channel_media_id, 0, message)
	socket[this.names].emit('send-message', {'channel_id': channel_id, 'user_id': me.user_id, "media_id": data.channel_media_id, 'message': message})
}
/*
let handle = {
	keyup: {},
}*/
Channels.prototype.handle_keyup_send_message = async function(e) {
	if(e.key == "Enter") {
		this.handle_click_send()
	}
}
Channels.prototype.handle_click_leave = async function() {
	console.table(this)
	console.trace(this)

	let data = await fetch_data(`channels/leave`, {'channel_id': this.current})   //`channel_id=${this.current}`
	this.lp.removeChild(document.getElementById(`prev_${this.names}_${this.current}`))
	this.lc.removeChild(document.getElementById(`conv_${this.names}_${this.current}`))
	this.di.src = ''
	this.dt.innerHTML = ''
	this.lmem.innerHTML = ''
	this.lmem.style.display = 'none'
	this.previous[this.current] = {}
	this.current = 0
	//also emmit event to leave this socket.io room
}
