import { title } from '../../validations'

export default function(e) {
	this.validation.create.title = true
	let array = title(e.value)

	array.forEach((v, num) => {
		if(v) {
			this.e.modal_create.getElementsByClassName('validation')[1].getElementsByTagName('div')[num].classList.add('bg-green')
		} else {
			this.validation.create.title = false
			this.e.modal_create.getElementsByClassName('validation')[1].getElementsByTagName('div')[num].classList.remove('bg-green')
		}
	})
}
