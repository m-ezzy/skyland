Trio.prototype.update_info = function({conv_id, conv_name, title, extension}) {
	if(conv_name) {
		this.previous[conv_id].conv_name = conv_name
		document.getElementById(`prev_${this.names}_${conv_id}`).getElementsByClassName("conv_name")[0].innerText = '@' + conv_name
		if(this.current == conv_id) {
			this.h_n.innerText = "@" + conv_name
			this.i_n.value = conv_name

			let url = `/${this.names}/${conv_name}`
			if(this.bari.classList.contains('hidden') == false) {
				url += '/info'
			}
			history.replaceState('', '', url)
		}
	}
	if(title) {
		this.previous[conv_id].title = title
		document.getElementById(`prev_${this.names}_${conv_id}`).getElementsByClassName("title")[0].innerText = title
		if(this.current == conv_id) {
			this.h_t.innerText = title
			this.i_t.value = title
		}
	}
	if(extension) {
		this.previous[conv_id].extension = extension
		let src = `/data/icons/${this.names}/${conv_id}.${extension}`
		document.getElementById(`prev_${this.names}_${conv_id}`).getElementsByClassName("icon")[0].src = src
		if(this.current == conv_id) {
			this.h_i.src = src
			this.i_i.src = src
		}
	}
}
