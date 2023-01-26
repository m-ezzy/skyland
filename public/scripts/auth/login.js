// import { fetch_data } from '../tools.js'

validation = {
    log_in: {
		user_name: {
			filled: false,
			length: false, // length maximum_characters
			charactersAllowed: false,
			registered: false,
		},
		pass_word: {
			filled: false,
			length: false,
			charactersAllowed: false,
			correct: false,
		}
	}
}
async function handle_change_LIUN() {
  let user_name = document.getElementById("LIUN").value
	let ve = document.getElementsByClassName('validation liun')[0].getElementsByTagName('div')

	if (user_name.length) {
		validation.log_in.user_name.filled = true
	} else {
		validation.log_in.user_name.filled = false
	}
	if (user_name.length > 20) {
		validation.log_in.user_name.maximum_characters = false
	} else {
		validation.log_in.user_name.maximum_characters = true
	}
	let data = await fetch_data('/users/check_user_name', {user_name: user_name})
	if (data) {
		validation.log_in.user_name.registered = true
	} else {
		validation.log_in.user_name.registered = false
	}

	for(let i = 0 ; i < Object.keys(ve).length ; i++) {
		let check = false
		if(i == 0) {
			check = validation.log_in.user_name.filled
		}
		if(i == 1) {
			check = validation.log_in.user_name.maximum_characters
		}
		if(i == 2) {
			check = validation.log_in.user_name.registered
		}
		
		if(check) {
			if(ve[i].classList.contains('bg-red')) {
				ve[i].classList.remove('bg-red')
				ve[i].classList.add('bg-green')
			}
		} else {
			if(ve[i].classList.contains('bg-green')) {
				ve[i].classList.remove('bg-green')
				ve[i].classList.add('bg-red')
			}
		}
	}
}
async function handle_change_LIPW() {
}
async function handle_click_log_in() {
	let user_name = document.getElementById("LIUN").value
	let pass_word = document.getElementById("LIPW").value

	let data = await fetch_data("auth/log_in", {user_name: user_name, pass_word: pass_word})
	if(data.status == 'failure') {
		// log in failed
		// reason = data.reason
	} else {
		location.href = '/'
	}
}
async function handle_click_link_sign_up() {
	let data = await fetch_data("/auth/sign_up/load", '')
	document.getElementsByClassName('holder')[0].innerHTML = data.html
}
