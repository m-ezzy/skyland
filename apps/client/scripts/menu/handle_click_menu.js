import { content } from '../index'
import { fetch_data } from '../clients/api-client'

import update_browser_route from './update_browser_route'

export default async function() {
	if( this.names == 'calls' && this.loaded == false && (chats.loaded == false || groups.loaded == false) ) {
		await chats.handle_click_menu()
		await groups.handle_click_menu()
	}
	
	//if (this.is_open) {return}
	if (content.current) {
		if (this.number == content.current.number) {return}
		content.current.is_open = false
		content.current.e.menu.classList.remove('selected')
		content.current.e.content.classList.add('hidden')
	}
	content.current = this
	this.is_open = true
	this.e.menu.classList.add('selected')
	this.e.content.classList.remove('hidden')

	update_browser_route.call(this)

	if (this.loaded == false) {
		this.loaded = true
		let { html } = await fetch_data(`/template/content/${this.names}`, {})
		this.e.content.innerHTML = html

		this.initialize()
		await this.load()

		// if( ['chats', 'groups', 'channels'].includes(this.names) ) {
		/*
		if (this.names == "calls") {
			await this.get_history()
		} else if(this.names == "account") {
			await this.get_info()
		}
		if (this.name != 'call' && this.conv) {
			await this.handle_click_prev(Object.keys(this.conv)[0])
		}*/
	}/*
	if (innerWidth <= configs.screen.mobile && (this.call_outgoing || this.call_incoming)) {
		menu_bar.element.style.display = 'none';
		this.bl.style.display = 'none';
		this.bc.style.display = 'grid';
	}*/
}
