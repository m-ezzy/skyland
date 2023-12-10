export default function() {
	this.update_card()

	this.e.f.icon.value = ''
	this.e.b.icon.classList.add('hidden')
	this.e.info.cn.setAttribute('readonly', true)
	this.e.info.t.setAttribute('readonly', true)

	this.e.b.edit.classList.remove('hidden')
	this.e.b.submit.classList.add('hidden')
	this.e.b.cancel.classList.add('hidden')

	if(this.names == 'channels') {
		Object.values(this.e.l.mem.getElementsByClassName('button')).forEach(b => {
			b.classList.add('hidden')
		})
	}
}
