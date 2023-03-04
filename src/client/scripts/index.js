import '../styles/variables.css'
import '../styles/basic.css'
import '../styles/animations.css'
import '../styles/index.css'

import '../styles/layout/auth/auth.css'
import '../styles/layout/auth/signup.css'
import '../styles/layout/auth/login.css'

import '../styles/dashboard/dashboard.css'
import '../styles/dashboard/menu_bar.css'
import '../styles/dashboard/content.css'
import '../styles/dashboard/account.css'
import '../styles/dashboard/common.css'
import '../styles/dashboard/calls.css'
import '../styles/dashboard/trio.css'
import '../styles/dashboard/chats_groups.css'
import '../styles/dashboard/groups_channels.css'
import '../styles/dashboard/chats.css'
import '../styles/dashboard/groups.css'
import '../styles/dashboard/channels.css'

import signup from './auth/signup'
import login from './auth/login'

// import MenuBar from './menu_bar'
import Calls from './tree/calls'
import Chats from './tree/chats'
import Groups from './tree/groups'
import Channels from './tree/channels'
import Account from './tree/account'

// import Content from './tree/content'

// import handle_click_menu from './menu/handle_click_menu'

import { getCookie } from './tools'
import { fetch_data } from './api-client'

export let content = {
	current: null,
	instances: {}
}

// theme.change()

// console.log(getCookie("menu"), getCookie("conv"), getCookie("info"))
// console.log(getCookie("menu") == null, getCookie("menu") == '')

let menu = location.pathname.split('/')[1]
let conv_name = location.pathname.split('/')[2]
let info = location.pathname.split('/')[3]
console.log(menu, conv_name, info)

if(getCookie('user_id') == null) {
	let data1 = await fetch_data('/template/auth/auth', {})
	document.getElementsByClassName('app')[0].innerHTML = data1.html

	if(['log_in', 'sign_up'].includes(menu) == false) {
		menu = 'log_in'
	}
	window.history.pushState('', '', menu)
	let data2 = await fetch_data(`/template/auth/${menu}`, {})
	document.getElementsByClassName(`card ${menu}`)[0].innerHTML = data2.html
	document.getElementsByClassName(`card ${menu}`)[0].classList.remove('hidden')
} else {
	let data1 = await fetch_data('/template/content/dashboard', {})
	document.getElementsByClassName('app')[0].innerHTML = data1.html

	// menu_bar = new MenuBar()
	calls = new Calls(0, "call")
	chats = new Chats(1, "chat")
	groups = new Groups(2, "group")
	channels = new Channels(3, "channel")
	account = new Account(4, "account")
	content.instances = {calls: calls, chats: chats, groups: groups, channels: channels, account: account}

	let data2 = await fetch_data('/users/get_info', {})
	account.all = data2
	account.current = { user_id: data2.user_id, user_name: data2.user_name, first_name: data2.first_name, last_name: data2.last_name, extension: data2.extension }

	// if (getCookie("menu") != null) {
	if (['calls', 'chats', 'groups', 'channels', 'account'].includes(menu) == false) {
		menu = 'chats'
		conv_name = null
		info = null
	}
	await content.instances[menu].handle_click_menu()

	// if (getCookie("conv") != null) {
	if (conv_name) {
		let id = 0
		Object.entries(content.current.conv).forEach(([conv_id, conv]) => {
			if(conv.conv_name == conv_name) {
				id = conv_id
			}
		})
		content.current.handle_click_prev(id)
		// if (getCookie("info")) {
		if (id && info) {
			content.current.handle_click_detail()
		}
	}
}

import peer from './peer-client'

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
