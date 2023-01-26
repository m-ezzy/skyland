Trio.prototype.handle_click_submit = async function() {
	let s = ''
	/*if (this.previous[this.current].group_name == this.tgn && this.previous[this.current].title == this.tt) {
		return
	}*/
	// let conv_id = this.current
	let conv_name = null
	let title = null
	let extension = null

	if (this.previous[this.current].conv_name != this.i_n.value) {
		conv_name = this.i_n.value
		s += `${this.name}_name='${conv_name}'`
	}
	if (this.previous[this.current].title != this.i_t.value) {
		title = this.i_t.value
		if(s != '') {
			s += ','
		}
		s += `title='${title}'`
	}
	if (s != '') {
		let status = await fetch_data(`${this.names}/update/info`, {conv_id: this.current, 'o': s})
	}
	if (this.i_i_f.files.length != 0) {
		extension = this.i_i_f.value.substring(this.i_i_f.value.lastIndexOf('.') + 1) //this.i_i_f.value.split('.')[1]
		let fd = new FormData()
		fd.append('conv_id', this.current)
		fd.append('old_extension', this.previous[this.current].extension)
		fd.append('file', this.i_i_f.files[0])
		let status = await fetch_data(`${this.names}/update/icon`, fd, true)
	}
	let data = {
		conv_id: this.current,
		conv_name: conv_name,
		title: title,
		extension: extension
	}
	socket[this.names].emit('update-info', data)
	this.update_info(data)
	this.handle_click_cancel()
	// this.handle_click_prev(this.current)
}
