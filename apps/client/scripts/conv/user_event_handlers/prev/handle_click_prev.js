// import Trio from "./properties"

export default function(conv_id) {
	if ( this.current == conv_id ) {return}
	if (this.current) {
		document.getElementById(`prev_${this.names}_${this.current}`).classList.remove('selected')
		this.e.l.media.innerHTML = ''
	} else {
		this.e.bar.conv.classList.remove('hidden')
	}
	this.current = conv_id
	document.getElementById(`prev_${this.names}_${conv_id}`).scrollIntoView({block: 'nearest'})
	document.getElementById(`prev_${this.names}_${conv_id}`).classList.add('selected')
	document.getElementById(`nmi_${this.names}_${conv_id}`).innerText = ''
	document.getElementById(`nmi_${this.names}_${conv_id}`).classList.add('hidden')

	this.update_detail()

	// console.log(this.keys, this.keys.get(Number(conv_id)), conv_id)
	if(this.names != 'channels') {
		this.e.t.key.value = this.keys.has(conv_id) ? this.keys.get(conv_id) : ''
		// this.e.t.key.value = this.keys.get(conv_id)
	}

	Object.entries(this.conv[conv_id].media).forEach(([media_id, m]) => {
		this.add_media({conv_id, ...m}, false)
	})
	this.handle_scroll_conv(conv_id)
	// this.e.l.media.scrollTop = this.conv[conv_id].scroll_top

	if(this.names == 'channels') {
		if ( [1, 2].includes(this.conv[conv_id].members[account.current.user_id].member_type)) {
			this.e.sender.classList.remove('hidden')
		} else {
			this.e.sender.classList.add('hidden')
		}
	}
	this.update_info_bar()
	this.update_browser_route()
	/*
	if (innerWidth <= 400) {
		menu_bar.element.style.display = 'none';
		this.bl.style.display = 'none';
		this.bc.style.display = 'grid';
	}*/
}
