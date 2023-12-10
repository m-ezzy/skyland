import { conv_name } from '../../validations'

export default async function(e) {
	this.validation.create.conv_name = true
	let array = await conv_name(e.value, this.names)

	array.forEach((v, num) => {
		if(v) {
			this.e.modal_create.getElementsByClassName('validation')[0].getElementsByTagName('div')[num].classList.add('bg-green')
		} else {
			this.validation.create.conv_name = false
			this.e.modal_create.getElementsByClassName('validation')[0].getElementsByTagName('div')[num].classList.remove('bg-green')
		}
	})
}
