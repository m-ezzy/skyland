export default function() {   //info details
	this.info_is_open = this.info_is_open ? false : true
	this.e.bar.info.classList.toggle('hidden')
	history.pushState('', '', `/${this.names}/${this.conv[this.current].conv_name}${(this.info_is_open ? '/info' : '')}`)
}/*
// now you can extend this class easily. you don't know how to extend the function method
export class handle_click_info {
	constructor() {
		let url = `/${this.names}/${this.conv[this.current].conv_name}`
		if (this.e.bar.info.classList.contains('hidden')) {
			this.info_is_open = false
			url += '/info'
		}
		this.e.bar.info.classList.toggle('hidden')
		history.pushState('', '', url)
	}
}*/
