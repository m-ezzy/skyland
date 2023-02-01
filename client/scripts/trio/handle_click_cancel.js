export default function() {
	this.e.b.icon.classList.add('hidden')
	this.e.info.cn.setAttribute('readonly', true)
	this.e.info.t.setAttribute('readonly', true)

	this.e.b.edit.classList.remove('hidden')
	this.e.b.submit.classList.add('hidden')
	this.e.b.cancel.classList.add('hidden')

	this.e.f.icon.value = ''
	this.e.info.i.src = (this.conv[this.current].extension) ? `/data/icons/${this.names}/${this.current}.${this.conv[this.current].extension}` : this.place_holder
	this.e.info.cn.value = this.conv[this.current].conv_name
	this.e.info.t.value = this.conv[this.current].title
}
