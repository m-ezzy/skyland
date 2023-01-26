Trio.prototype.handle_click_cancel = function() {
	this.i_i_b.classList.add('hidden')
	this.i_n.setAttribute('readonly', true)
	this.i_t.setAttribute('readonly', true)

	this.b_edit.classList.remove('hidden')
	this.b_submit.classList.add('hidden')
	this.b_cancel.classList.add('hidden')

	this.i_i_f.value = ''
	this.i_i.src = (this.previous[this.current].extension) ? `/data/icons/${this.names}/${this.current}.${this.previous[this.current].extension}` : this.place_holder
	this.i_n.value = this.previous[this.current].conv_name
	this.i_t.value = this.previous[this.current].title
}
