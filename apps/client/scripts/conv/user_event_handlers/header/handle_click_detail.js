export default function() {
	this.info_is_open = this.info_is_open ? false : true
	this.e.bar.info.classList.toggle('hidden')
	/*
	if(this.info_is_open) {
		window.history.forward()
	} else {
		window.history.back()
	}*/
	this.update_browser_route()
	// update_browser_route.call(this)
	/*
	if(this.info_is_open && this.info_conv_id != this.current) {
		this.update_info_bar()
	}*/
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
