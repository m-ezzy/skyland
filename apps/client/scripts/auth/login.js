import { isEmpty } from '../tools.js'
import { fetch_data } from '../clients/api-client'

let validation = {
	user_name: false,
	pass_word: false,
}

login.handle_change_user_name = async (input) => {
	validation.user_name = true
	
	let array = []
	array[0] = input.value.length ? true : false
	array[1] = !(await fetch_data('/users/check_conv_name', {conv_name: input.value}))

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
login.handle_change_pass_word = async (input) => {
	validation.pass_word = true

	let user_name = document.getElementById('LIUN').value
	let pass_word = document.getElementById('LIPW').value

	let array = []
	array[0] = input.value.length ? true : false
	array[1] = await fetch_data('/users/check_pass_word', {user_name: user_name, pass_word: pass_word})

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
login.handle_click_submit = async function() {
	if(validation.user_name == false || validation.pass_word == false) {return}

	let user_name = document.getElementById("LIUN").value
	let pass_word = document.getElementById("LIPW").value

	let data = await fetch_data("/users/log_in", {user_name: user_name, pass_word: pass_word})
	if(data.status == 'failure') {
		// log in failed
		// reason = data.reason
	} else {
		location.href = '/'
	}
}
login.handle_click_link = async () => {
	window.history.pushState('', '', 'sign_up')
	let data = await fetch_data(`/template/auth/sign_up`, {})
	document.getElementsByClassName(`card sign_up`)[0].innerHTML = data.html
	document.getElementsByClassName(`card log_in`)[0].classList.add('hidden')
	document.getElementsByClassName(`card sign_up`)[0].classList.remove('hidden')
}

export default 1
