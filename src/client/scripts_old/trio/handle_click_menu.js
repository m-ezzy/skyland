import handle_click_menu from '../content/handle_click_menu'
import { isEmpty, fetch_data } from '../tools'
import { socket } from "../sockets"

export default async function() {
	// super.handle_click_menu()
	console.log(Object.getPrototypeOf(this))
	console.log(this.prototype)
	// Object.getPrototypeOf(this).prototype.handle_click_menu.bind(this)

	handle_click_menu.call(this)
	// this.__proto__.__proto__.__proto__.handle_click_menu()

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

	if(this.loaded == 0) {
		this.loaded = 1
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
}
