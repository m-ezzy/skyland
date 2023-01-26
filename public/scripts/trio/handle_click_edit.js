Trio.prototype.handle_click_edit = async function() {
	this.i_i_b.classList.remove('hidden')
	this.i_n.removeAttribute('readonly')
	this.i_t.removeAttribute('readonly')

	this.b_edit.classList.add('hidden')
	this.b_submit.classList.remove('hidden')
	this.b_cancel.classList.remove('hidden')
	// this.bari.getElementsByClassName('submit_cancel')[0].classList.remove('hidden')
}
