export default function() {
	this.e.f.icon.value = ''

	this.e.b.icon.classList.toggle('hidden')
	this.e.b.edit.classList.toggle('hidden')
	this.e.b.submit.classList.toggle('hidden')
	this.e.b.cancel.classList.toggle('hidden')

	this.e.t.un.toggleAttribute('readonly')
	this.e.t.fn.toggleAttribute('readonly')
	this.e.t.ln.toggleAttribute('readonly')
	this.e.t.em.toggleAttribute('readonly')
	this.e.t.m.toggleAttribute('readonly')
	this.e.t.pw.toggleAttribute('readonly')
}
