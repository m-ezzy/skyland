import { io } from "socket.io-client"
import { getCookie } from "./tools"
import configurations from '../../configurations.mjs'

// let { ancestorOrigins, hash, host, hostname, href, origin, pathname, port, protocol, search } = window.location
// console.log(ancestorOrigins, hash, host, hostname, href, origin, pathname, port, protocol, search)

// let protocol1 = 'http' //http //https //ws //wss //window.location.protocol
// let host1 = window.location.hostname //localhost //window.location.hostname
// let port1 = 7000 //5173 //8000 //8001 //7000 //window.location.port
// let path1 = '' //'' //'/socket' //'/conv'

let { protocol, hostname, port, path } = configurations.socket_server

let socket_server_url = `${protocol}://${window.location.hostname}:${port}${path}`

export let socket = {
	def: io(socket_server_url + "/", {
		// path: '/socket',
		// port: 7000,
		// protocols: ['ws'],
		transports: ['websocket', 'polling', 'flashsocket'],
		auth: {
			user_id: getCookie('user_id')
		}
	}),
	chats: io(socket_server_url + '/chats', {auth: {user_id: getCookie('user_id')}}),
	groups: io(socket_server_url + '/groups'),
	channels: io(socket_server_url + '/channels'),
}

socket.def.emit('new-connection', { user_id: getCookie('user_id') })

//chats.socket = io('/chats');

//let def = {};
//def.socket.emit('new-connection', { 'user_id': getCookie('user_id') });

socket.def.on('chats-created-conv', (data) => {
	console.log(data)
	socket.chats.emit('join-conv', {conv_id: data.conv_id})
	chats.add_prev(data.last_id, data)
})
socket.def.on('groups-added-member', (data) => {
	console.log(data)
	socket.groups.emit('join-conv', {conv_id: data.conv_id})
	// groups.conv[data.conv_id] = data
	//this.conv[group_id] = {'group_name': group_id, 'group_name': group_name, 'title': title, 'extension': extension, 'row_up': 0, 'row_down': row_down}
	groups.add_prev(data.last_id, data.group, Object.values(data.group.members))
})

socket.chats.on('receive-media', (data) => {
	console.log(data)
	chats.add_media(data, true)
})
socket.chats.on('delete', (data) => {
	console.log(data)
	chats.on_delete(data)
})

socket.groups.on('receive-media', (data) => {
	console.log(data)
	groups.add_media(data, true)
})
socket.groups.on('update-info', (data) => {
	console.log(data)
	groups.update_info(data)
})
socket.groups.on('added-member', (data) => {
	console.log(data)
	groups.add_member(data.conv_id, data.user, true)
})
socket.groups.on('member-leave', (data) => { //member-left
	console.log(data)
	groups.on_leave(data)
})
socket.groups.on('member-delete', (data) => { //member-left
	console.log(data)
	groups.on_delete(data)
})

socket.channels.on('receive-media', (data) => {
	console.log(data)
	channels.add_media(data, true)
})
socket.channels.on('update-info', (data) => {
	console.log(data)
	channels.update_info(data)
})
socket.channels.on('added-member', (data) => {
	console.log(data)
	channels.add_member(data.conv_id, data.user, true)
})
socket.channels.on('designation-change', (data) => {
	console.log(data)
	channels.update_designation(data)
})
socket.channels.on('member-leave', (data) => {
	console.log(data)
	channels.on_leave(data)
})
socket.channels.on('member-delete', (data) => {
	console.log(data)
	channels.on_delete(data)
})
