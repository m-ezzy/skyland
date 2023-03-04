export default function() {
	this.e.b.icon.classList.remove('hidden')
	this.e.info.cn.removeAttribute('readonly')
	this.e.info.t.removeAttribute('readonly')

	this.e.b.edit.classList.add('hidden')
	this.e.b.submit.classList.remove('hidden')
	this.e.b.cancel.classList.remove('hidden')
	// this.bari.getElementsByClassName('submit_cancel')[0].classList.remove('hidden')
	if(this.names == 'channels') {
		Object.values(this.e.l.mem.getElementsByClassName('button')).forEach(b => {
			b.classList.remove('hidden')
		})
	}
}
