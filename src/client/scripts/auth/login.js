import { isEmpty } from '../tools.js'
import { fetch_data } from '../api-client'

let validation = {
	user_name: {
		filled: false,
		registered: false,
	},
	pass_word: {
		filled: false,
		correct: false,
	}
}
let pass_word_correct = ""

login.handle_change_un = async () => {
  let user_name = document.getElementById("LIUN").value
	let ve = document.getElementsByClassName('validation liun')[0].getElementsByTagName('div')

	if (user_name.length) {
		validation.user_name.filled = true
	} else {
		validation.user_name.filled = false
	}
	let data = await fetch_data('/users/check_user_name', {user_name: user_name})
	if (isEmpty(data)) {
		validation.user_name.registered = false
		pass_word_correct = ''
	} else {
		validation.user_name.registered = true
		pass_word_correct = data.pass_word
	}
	for(let i = 0 ; i < Object.keys(ve).length ; i++) {
		let check = false
		if(i == 0) {
			check = validation.user_name.filled
		}
		if(i == 1) {
			check = validation.user_name.registered
		}
		if(check) {
			// if(ve[i].classList.contains('bg-red')) {
				ve[i].classList.remove('bg-red')
				ve[i].classList.add('bg-green')
			// }
		} else {
			// if(ve[i].classList.contains('bg-green')) {
				ve[i].classList.remove('bg-green')
				ve[i].classList.add('bg-red')
			// }
		}
	}
}
login.handle_change_pw = async () => {
  let pass_word = document.getElementById("LIPW").value
	let ve = document.getElementsByClassName('validation lipw')[0].getElementsByTagName('div')

	if (pass_word.length) {
		validation.pass_word.filled = true
	} else {
		validation.pass_word.filled = false
	}
	if (pass_word == pass_word_correct) {
		validation.pass_word.correct = true
	} else {
		validation.pass_word.correct = false
	}
	Object.entries(validation.pass_word).forEach(([validate, result], num) => {
		if(result) {
			ve[num].classList.remove('bg-red')
			ve[num].classList.add('bg-green')
		} else {
			ve[num].classList.remove('bg-green')
			ve[num].classList.add('bg-red')
		}
	})/*
	for(let i = 0 ; i < Object.keys(ve).length ; i++) {
		let check = false
		if(i == 0) {
			check = validation.pass_word.filled
		}
		if(i == 1) {
			check = validation.pass_word.registered
		}
		if(check) {
			ve[i].classList.remove('bg-red')
			ve[i].classList.add('bg-green')
		} else {
			ve[i].classList.remove('bg-green')
			ve[i].classList.add('bg-red')
		}
	}*/
}
login.handle_click_submit = async function() {
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
login.handle_click_link_sign_up = async () => {
	let data = await fetch_data("/auth/users/load", {})
	document.getElementsByClassName('holder')[0].innerHTML = data.html
}

export default 1
