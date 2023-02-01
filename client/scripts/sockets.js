import { io } from "socket.io-client"
import { getCookie } from "./tools"

export let socket = {
	def: io("http://localhost:8000/", {
		transports: ['websocket', 'polling', 'flashsocket'],
		auth: {user_id: getCookie('user_id')}
	}),
	chats: io('http://localhost:8000/chats', {auth: {user_id: getCookie('user_id')}}),
	groups: io('http://localhost:8000/groups'),
	channels: io('http://localhost:8000/channels'),
}

socket.def.emit('new-connection', { user_id: getCookie('user_id') })

//chats.socket = io('/chats');

//let def = {};
//def.socket.emit('new-connection', { 'user_id': getCookie('user_id') });

socket.def.on('created-conv', (data) => {
	socket.chats.emit('join-conv', {conv_id: data.conv_id})
	chats.conv[data.conv_id] = data
	chats.item_previous(data.conv_id, data)
})
socket.chats.on('receive-media', (data) => {
	console.log(data)
	chats.item_media(data)
})

socket.def.on('groups-added-member', (data) => {
	console.log(data)
	socket.groups.emit('join-conv', {conv_id: data.conv_id})
	// groups.conv[data.conv_id] = data
	//this.conv[group_id] = {'group_name': group_id, 'group_name': group_name, 'title': title, 'extension': extension, 'row_up': 0, 'row_down': row_down}
	groups.item_previous(data.last_id, data.group, Object.values(data.group.members))
	groups.item_conv(data.conv_id)
})

socket.groups.on('joined-new-group', (data) => {
	console.log(data)
	groups.conv[data.group_id] = data.value
	//this.conv[group_id] = {'group_name': group_id, 'group_name': group_name, 'title': title, 'extension': extension, 'row_up': 0, 'row_down': row_down}
	groups.item_previous(data.group_id, data.value)
	groups.item_conv(data.group_id)
})
socket.groups.on('receive-media', (data) => {
	console.log(data)
	groups.item_media(data)
})
socket.groups.on('update-info', (data) => {
	console.log(data)
	groups.update_info(data)
})
socket.groups.on('added-member', (data) => {
	console.log(data)
	groups.conv[data.conv_id].members[data.user_id] = data.user
	if(groups.current == data.conv_id) {
		groups.item_member(data.conv_id, data.user)
	}
})
socket.groups.on('member-left', (data) => {
	console.log(data)
	groups.update_leave(data)
})

socket.channels.on('receive-media', (data) => {
	console.log(data)
	channels.item_media(data)
})
socket.channels.on('update-info', (data) => {
	console.log(data)
	channels.update_info(data)
})
socket.channels.on('added-member', (data) => {
	console.log(data)
	channels.item_member(data.conv_id, data.user)
})
socket.channels.on('designation-change', (data) => {
	console.log(data)
	channels.update_designation(data)
})
socket.channels.on('member-left', (data) => {
	console.log(data)
	channels.update_leave(data)
})
