export default async function(names, conv_id) {
	console.log('calls - incoming remove - names = ', names,' - conv_id = ', conv_id)
	console.log(this.e.l.ic.hasChildNodes, "   ", this.e.l.ic.childElementCount)
	console.log(document.getElementById(`incoming_${names}_${conv_id}`))

	this.e.l.ic.removeChild(document.getElementById(`incoming_${names}_${conv_id}`))
	if(this.e.l.ic.childElementCount == 0) {
		this.e.l.ic.classList.add('hidden')

		if(this.current == 0) {
			this.e.menu.style.animationName = ''
		}
	}
}
