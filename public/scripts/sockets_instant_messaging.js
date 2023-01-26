let socket = {
	def: io('/', {auth: {user_id: getCookie('user_id')}}),
	chats: io('/chats', {auth: {user_id: getCookie('user_id')}}),
	groups: io('/groups'),
	channels: io('/channels'),
};

socket.def.emit('new-connection', { 'user_id': getCookie('user_id') });

//chats.socket = io('/chats');

//let def = {};
//def.socket.emit('new-connection', { 'user_id': getCookie('user_id') });

socket.chats.on('notify-created-chat', (data) => {
	socket.chats.emit('join-conv', {chat_id: data.chat_id})
	chats.previous[data.chat_id] = data.o
	chats.add_item_previous(data.chat_id, o)
})
socket.chats.on('receive-media', (data) => {
	console.log(data)
  chats.add_item_media(data, data.time, false)
	if (chats.current != data.chat_id) {
		document.getElementById(`nmi_chats_${data.chat_id}`).textContent = (Number(document.getElementById(`nmi_chats_${data.chat_id}`).innerText) + 1)
		//document.getElementById(`nmi_chats_${data.chat_id}`).innerText += 1
	}
})

socket.def.on('added-member', (data) => {
	console.log(data)
	groups.previous[data.group_id] = JSON.parse(data.value)
	//this.previous[group_id] = {'group_name': group_id, 'group_name': group_name, 'title': title, 'extension': extension, 'row_up': 0, 'row_down': row_down}
	groups.add_item_previous(data.group_id, JSON.parse(data.value))
	groups.add_item_conv(data.group_id)
})

socket.groups.on('joined-new-group', (data) => {
	console.log(data)
	groups.previous[data.group_id] = data.value
	//this.previous[group_id] = {'group_name': group_id, 'group_name': group_name, 'title': title, 'extension': extension, 'row_up': 0, 'row_down': row_down}
	groups.add_item_previous(data.group_id, data.value)
	groups.add_item_conv(data.group_id)
})
socket.groups.on('receive-media', (data) => {
	console.log(data)
	//decrypt message here if decryption is on
  groups.add_item_media(data, data.time, true)
	if (this.current != data.group_id) {
		document.getElementById(`nmi_groups_${group_id}`).innerHTML = (Number(document.getElementById(`conv_groups_${group_id}`).innerText) + 1)
	}
})
socket.groups.on('update-info', (data) => {
	console.log(data)
	groups.update_info(data)
})
socket.groups.on('member-left', (data) => {
	console.log(data)
	groups.previous[data.conv_id].members[data.user_id] = {}
	if(groups.current == data.conv_id) {
		groups.lmem.removeChild(document.getElementById(`mem_groups_${data.user_id}`))
	}
})
