export default function(mode) {
	let url = `/${this.names}`

	if ( ['chats', 'groups', 'channels'].includes(this.names) ) {
		if (this.current) {
			url += `/${this.conv[this.current].conv_name}`
			if(this.info_is_open) {
				url += '/info'
			}
		}
	}
	history.pushState('', '', url)
	// history.pushState({}, '', `/${this.names}`)
	// history.pushState('', '', `/${this.names}/${this.conv[this.current].conv_name}${(this.info_is_open ? '/info' : '')}`)
	// window.history.pushState({}, '', `/${this.names}${this.current ? `/${this.conv[this.current].conv_name}` : ''}${this.info_is_open ? '/info' : ''}`)
	// window.history.pushState({}, '', `${window.location.origin}/${this.names}`)
	// history.replaceState()
}
