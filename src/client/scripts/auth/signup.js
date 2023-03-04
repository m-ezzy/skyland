import { isEmpty } from '../tools.js'
import { fetch_data } from '../api-client'

let validation = {
	// signUp: {
		userName: {
			filled: false,
			maximumCharacters: false, //length
			charactersAllowed: false,
			available: false,
		},
		firstName: {
			filled: false,
			length: false,
		},
		lastName: {
			filled: false,
			length: false,
		},
		email: {
			filled: false,
			length: false,
			charactersAllowed: false,
			regularExpression: false,
		},
		mobile: {
			filled: false,
			length: false,
			charactersAllowed: false,
		},
		passWord: {
			filled: false,
			length: false,
			charactersAllowed: false,
			onlyApprovedCharacters: false,
		}
	// }
}
signup.handle_change_un = async function() {
	let user_name = document.getElementById("SUUN").value
	let ve = document.getElementsByClassName('validation suun')[0].getElementsByTagName('div')
	// document.getElementById("SUUN").classList.add()

	if (user_name.length) {
		validation.userName.filled = true
	} else {
		validation.userName.filled = false
	}
	if (user_name.length > 20) {
		validation.userName.maximumCharacters = false
	} else {
		validation.userName.maximumCharacters = true
	}
	let regex = new RegExp('[0-9]');
	if (regex.test(user_name)) {
		validation.userName.charactersAllowed = true
	} else {
		validation.userName.charactersAllowed = false
	}
	let data = await fetch_data('/users/check_user_name', {user_name: user_name})
	if (isEmpty(data)) {
		validation.userName.available = true
	} else {
		validation.userName.available = false
	}

	// console.table(Object.keys(ve).length)
	for(let i = 0 ; i < Object.keys(ve).length ; i++) {
		let check = false
		if(i == 0) {
			check = validation.userName.filled
		}
		if(i == 1) {
			check = validation.userName.maximumCharacters
		}
		if(i == 2) {
			check = validation.userName.charactersAllowed
		}
		if(i == 3) {
			check = validation.userName.available
		}
		if(check) {
			// if(ve[i].classList.contains('red')) {
				ve[i].classList.remove('bg-red')
				ve[i].classList.add('bg-green')
			// }
		} else {
			// if(ve[i].classList.contains('green')) {
				ve[i].classList.remove('bg-green')
				ve[i].classList.add('bg-red')
			// }
		}
	}
}
signup.handle_change_pw = () => {
	let pass_word = document.getElementById("SUPW").value
}
signup.handle_change_fn = () => {
	let first_name = document.getElementById("SUFN").value
}
signup.handle_change_ln = () => {
	let last_name = document.getElementById("SULN").value
}
signup.handle_click_submit = async () => {
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

export default 1
