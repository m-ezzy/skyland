Trio.prototype.handle_click_prev = async function(conv_id) {
	if ( this.current == conv_id ) {return}
	if (this.current) {
		// document.getElementById(`prev_${this.names}_${this.current}`).style.backgroundColor = 'var(--bg-eb)'
		document.getElementById(`prev_${this.names}_${this.current}`).classList.remove('blur')
		document.getElementById(`conv_${this.names}_${this.current}`).classList.add('hidden')
	} else {
		this.barc.classList.remove('hidden')
	}
	this.current = conv_id
	document.getElementById(`prev_${this.names}_${conv_id}`).classList.add('blur')
	document.getElementById(`nmi_${this.names}_${conv_id}`).innerText = ''

	let src = ''
	if(this.names == 'chats') {
		src = `users/${this.previous[conv_id].user_id}`
	} else {
		src = `${this.names}/${conv_id}`
	}
	src = (this.previous[conv_id].extension) ? `/data/icons/${src}.${this.previous[conv_id].extension}` : this.place_holder
	
	this.h_i.src = src
	this.h_n.innerText = `@${this.previous[conv_id].conv_name}`
	this.h_t.innerText = this.previous[conv_id].title

	document.getElementById(`conv_${this.names}_${conv_id}`).classList.remove('hidden')
	if (this.previous[conv_id].row_up > 0) {
		this.previous_media(conv_id)
	}

	this.i_i.src = src
  this.i_n.value = this.previous[conv_id].conv_name
  this.i_t.value = this.previous[conv_id].title

	let url = `/${this.names}/${this.previous[conv_id].conv_name}`
	if (this.bari.classList.contains('hidden') == false) {
		url += '/info'
	}
	history.pushState('', '', url)
	/*
	if (innerWidth <= 400) {
		menu_bar.element.style.display = 'none';
		this.bl.style.display = 'none';
		this.bc.style.display = 'grid';
	}*/
	//this.nmi[this.current].style.backgroundColor = 'rgb(0, 0, 0, 0)';
	//this.nmi[this.current].innerHTML = '';

	/*
	if (this.previous[this.current].row_up != -1) {
		return;
	}
	this.previous[this.current].row_up = 0;
	*/
}
