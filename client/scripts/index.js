import '../styles/variables.css'
import '../styles/animations.css'
import '../styles/basic.css'
import '../styles/index.css'

import '../styles/auth/auth.css'
import '../styles/auth/signup.css'
import '../styles/auth/login.css'

import '../styles/modules/dashboard.css'
import '../styles/modules/menu_bar.css'
import '../styles/modules/content.css'
import '../styles/modules/account.css'
import '../styles/modules/common.css'
import '../styles/modules/calls.css'
import '../styles/modules/trio.css'
import '../styles/modules/chats_groups.css'
import '../styles/modules/groups_channels.css'
import '../styles/modules/chats.css'
import '../styles/modules/groups.css'
import '../styles/modules/channels.css'

import login from './auth/login'

import MenuBar from './menu_bar'
import Calls from './calls/properties'
import Chats from './chats/properties'
import Groups from './groups/properties'
import Channels from './channels/properties'
import Account from './account/properties'

import Content from './content/properties'

// import handle_click_menu from './menu/handle_click_menu'

import { getCookie, fetch_data } from './tools'

export let menu_bar

// theme.change()

// console.log(getCookie("menu"), getCookie("conv"), getCookie("info"))
// console.log(getCookie("menu") == null, getCookie("menu") == '')

let menu = location.pathname.split('/')[1]
let conv_name = location.pathname.split('/')[2]
let info = location.pathname.split('/')[3]
console.log(menu, conv_name, info)

if(getCookie('user_id') == null) {
	let data1 = await fetch_data('/template/auth/auth', '')
	document.getElementsByClassName('app')[0].innerHTML = data1.html

	if(['log_in', 'sign_up'].includes(menu) == false) {
		menu = 'log_in'
	}
	history.pushState('', '', menu)
	let data2 = await fetch_data(`/template/auth/${menu}`, '')
	document.getElementsByClassName('holder')[0].innerHTML = data2.html
} else {
	let data1 = await fetch_data('/template/content/dashboard', '')
	document.getElementsByClassName('app')[0].innerHTML = data1.html

	menu_bar = new MenuBar()
	calls = new Calls(0, "call")
	chats = new Chats(1, "chat")
	groups = new Groups(2, "group")
	channels = new Channels(3, "channel")
	account = new Account(4, "account")
	Content.instances = {calls: calls, chats: chats, groups: groups, channels: channels, account: account}

	let data2 = await fetch_data('/users/get_info', '')
	account.current = data2

	// if (getCookie("menu") != null) {
	if (['calls', 'chats', 'groups', 'channels', 'account'].includes(menu) == false) {
		menu = 'chats'
		conv_name = null
		info = null
	}
	await Content.instances[menu].handle_click_menu()

	// if (getCookie("conv") != null) {
	if (conv_name) {
		let id = 0
		Object.entries(Content.current.conv).forEach(([conv_id, v]) => {
			if(v.conv_name == conv_name) {
				id = conv_id
			}
		})
		Content.current.handle_click_prev(id)
		// if (getCookie("info")) {
		if (info) {
			Content.current.handle_click_info()
		}
	}
}
/*
localStorage.setItem('user_id', data.json.user_id);
sessionStorage.setItem('user_id', data.json.user_id);
console.log(localStorage.getItem('user_id'));
console.log(sessionStorage.getItem('user_id'));
*/
/*
document.body.onload = function() {
		Object.entries(document.getElementsByClassName('button')).forEach(([num, e]) => {
				console.log(e)
				e.style.backgroundImage = ''
		})
}*/
/*
window.onpopstate = function() {
	location.reload()
}*/
