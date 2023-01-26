Content.prototype.handle_click_menu = async function() {
	if (Content.current.number == this.number) {return} //OR
	if (this.is_open) {return}

	let url = `/${this.names}`
	if (["chats", "groups", "channels"].includes(this.names) && this.current) {
		url += '/'
		let name = '_name'

		if (this.name == 'chat') {
			name = 'user' + name
		} else {
			name = this.name + name
		}
		url += this.previous[this.current][name]

		if(this.bari.classList.contains("hidden") == false) {
			url += '/info'
		}
	}
	// window.history.pushState({}, '', `${window.location.origin}/${this.names}`)
	window.history.pushState({}, '', url)

	if (Content.current) {
		Content.current.is_open = 0
		Content.current.element.style.display = 'none'
		//Content.current.menu.style.backgroundColor = 'var(--bg-mb)'
		// menu_bar.elements[Content.current.number].style.backgroundColor = 'var(--bg-mb)'
		menu_bar.elements[Content.current.number].classList.remove('blur')
	}
	Content.current = this

	this.is_open = 1
	this.element.style.display = 'flex'
	menu_bar.elements[this.number].classList.add('blur')
	//menu_bar.elements[this.number].style.color = 'var(--item-selected-text)';

	if (this.loaded == 0) {
		this.loaded = 1

		if (this.name == 'account') {
			let { html } = await fetch_data(`users/load`, '')
			this.element.innerHTML = html
			//me = json
			return
		}
		let { html } = await fetch_data(`${this.names}/load`, '')
		this.element.innerHTML = html

		this.initialize()
		
		if (["chats", "groups", "channels"].includes(this.names)) {
			await this.previous_conv()
		} else if (this.names == "calls") {
			await this.get_history()
		} else {
			await this.get_info()
		}
		/*if (this.name != 'call' && this.previous) {
			await this.handle_click_prev(Object.keys(this.previous)[0])
		}*/
	}
}
