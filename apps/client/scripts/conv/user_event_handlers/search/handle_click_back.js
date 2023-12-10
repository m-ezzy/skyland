export default function() {
	if(['groups', 'channels'].includes(this.names)) {
		this.e.modal_create.classList.add('hidden')
	}
	this.e.l.search.classList.add('hidden') //toggle //add
	this.e.l.prev.classList.remove('hidden')
}
