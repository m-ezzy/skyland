import Content from "./properties"
import { menu_bar } from '../index'
import { isEmpty, fetch_data } from '../tools'
import { socket } from "../sockets"

export default async function() {
	if (Content.current.number == this.number) {return} //OR if (this.is_open) {return}
	// window.history.pushState({}, '', `${window.location.origin}/${this.names}`)
	// history.pushState({}, '', `/${this.names}`)

	if (Content.current) {
		Content.current.is_open = 0
		Content.current.e.content.classList.add('hidden')
		// Content.current.menu.style.backgroundColor = 'var(--bg-mb)'
		// menu_bar.elements[Content.current.number].style.backgroundColor = 'var(--bg-mb)'
		// menu_bar.elements[Content.current.number].classList.remove('blur')
		Content.current.e.menu.classList.remove('selected')
	}
	Content.current = this
	this.is_open = 1
	//menu_bar.elements[this.number].style.color = 'var(--item-selected-text)'
	// menu_bar.elements[this.number].classList.add('blur')
	this.e.menu.classList.add('selected')
	this.e.content.classList.remove('hidden')
	/*
	let url = `/${this.names}`
	if (this.current) {
		url += `/${this.conv[this.current].conv_name}`
		if(this.info_is_open) {
			url += '/info'
		}
	}
	window.history.pushState({}, '', url)
	*/
	window.history.pushState({}, '', `/${this.names}${this.current ? `/${this.conv[this.current].conv_name}` : ''}${this.info_is_open ? '/info' : ''}`)
	// window.history.pushState({}, '', `${window.location.origin}/${this.names}`)

	if (this.loaded == 0) {
		this.loaded = 1
		let { html } = await fetch_data(`/template/content/${this.names}`, '')
		this.e.content.innerHTML = html
		this.initialize()

		if( ['chats', 'groups', 'channels'].includes(this.names) ) {
			let data = await fetch_data(`/${this.names}/previous_conv`, '')
			if (isEmpty(data.convs)) {return}
			// will use Map someday in this.conv
			// this.conv = data

			data.convs.forEach(conv => {
				if ( this.names != 'chats' || (this.names == 'chats' && conv.deleted_by != account.current.user_id) ) {
					this.item_previous(data.last_id, conv, data.members?.[conv.conv_id])
					this.item_conv(conv.conv_id)
				}
				//sessionStorage.setItem(`chats_messages_${chat_id}`, JSON.stringify([]))
			})
			if(['groups','channels'].includes(this.names)) {
				socket[this.names].emit('join-all-my-rooms', Object.keys(this.conv))
			}
			/* only those previous conversation will be created and loaded that the user clicks on */
		}
		/*
		if (this.names == "calls") {
			await this.get_history()
		} else if(this.names == "account") {
			await this.get_info()
		}
		if (this.name != 'call' && this.conv) {
			await this.handle_click_prev(Object.keys(this.conv)[0])
		}*/
	}
}
