import { isEmpty } from '../tools.js'
import { pass_word, conv_name, title, first_last_name } from '../validations'
import { fetch_data } from '../clients/api-client'

let validation = {
	user_name: false,
	pass_word: false,
	first_name: false,
	last_name: false,
}

signup.handle_change_user_name = async (input) => {
	validation.user_name = true
	let array = await conv_name(input.value, 'users')

	let ve = document.getElementsByClassName('validation')[0].getElementsByTagName('div')
	array.forEach((v, num) => {
		if(v) {
			ve[num].classList.add('bg-green')
		} else {
			validation.user_name = false
			ve[num].classList.remove('bg-green')
		}
	})
}
signup.handle_change_pass_word = (input) => {
	validation.pass_word = true
	let array = pass_word(input.value)

	let ve = document.getElementsByClassName('validation')[1].getElementsByTagName('div')
	array.forEach((v, num) => {
		if(v) {
			ve[num].classList.add('bg-green')
		} else {
			validation.pass_word = false
			ve[num].classList.remove('bg-green')
		}
	})
}
signup.handle_change_first_name = (input) => {
	validation.first_name = true
	let array = first_last_name(input.value)

	let ve = document.getElementsByClassName('validation')[2].getElementsByTagName('div')
	array.forEach((v, num) => {
		if(v) {
			ve[num].classList.add('bg-green')
		} else {
			validation.first_name = false
			ve[num].classList.remove('bg-green')
		}
	})
}
signup.handle_change_last_name = (input) => {
	validation.last_name = true
	let array = first_last_name(input.value)

	let ve = document.getElementsByClassName('validation')[3].getElementsByTagName('div')
	array.forEach((v, num) => {
		if(v) {
			ve[num].classList.add('bg-green')
		} else {
			validation.last_name = false
			ve[num].classList.remove('bg-green')
		}
	})
}
signup.handle_click_submit = async () => {
	if( !validation.user_name || !validation.pass_word || !validation.first_name || !validation.last_name ) {return}

	let user_name = document.getElementById("SUUN").value
	let pass_word = document.getElementById("SUPW").value
	let first_name = document.getElementById("SUFN").value
	let last_name = document.getElementById("SULN").value

	let data = await fetch_data('/users/sign_up', {user_name: user_name, pass_word: pass_word, first_name: first_name, last_name: last_name})
	if(data.status == 'success') {
		location.href = '/'
	} else {
		alert('sign up failed!')
	}
}
signup.handle_click_link = async () => {
	window.history.pushState('', '', 'log_in')
	let data = await fetch_data(`/template/auth/log_in`, {})
	document.getElementsByClassName(`card sign_up`)[0].classList.add('hidden')
	document.getElementsByClassName(`card log_in`)[0].classList.remove('hidden')
	document.getElementsByClassName(`card log_in`)[0].innerHTML = data.html
}

export default 1
