let validation = {
	signUp: {
		userName: {
			filled: false,
			maximumCharacters: false,
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
	}
}
async function handleChangeSUUN() {
	let user_name = document.getElementById("SUUN").value
	let ve = document.getElementsByClassName('validation suun')[0].getElementsByTagName('div')

	// document.getElementById("SUUN").classList.add()

	if (user_name.length) {
		validation.signUp.userName.filled = true
	} else {
		validation.signUp.userName.filled = false
	}
	if (user_name.length > 20) {
		validation.signUp.userName.maximumCharacters = false
	} else {
		validation.signUp.userName.maximumCharacters = true
	}

	let response = await fetch('/auth/user_name_is_registered', {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_name=' + user_name});
	let result = await response.json()
	if (result) {
		validation.signUp.userName.available = false
	} else {
		validation.signUp.userName.available = true
	}

	console.table(Object.keys(ve).length)
	for(let i = 0 ; i < Object.keys(ve).length ; i++) {
		console.log(i)
		let check = false
		if(i == 0) {
			check = validation.signUp.userName.filled
		}
		if(i == 1) {
			check = validation.signUp.userName.maximumCharacters
		}
		if(i == 2) {
			check = validation.signUp.userName.available
		}
		
		if(check) {
			if(ve[i].classList.contains('red')) {
				ve[i].classList.remove('red')
				ve[i].classList.add('green')
			}
		} else {
			if(ve[i].classList.contains('green')) {
				ve[i].classList.remove('green')
				ve[i].classList.add('red')
			}
		}
	}
}
async function handleChangeSUPW() {
	let pass_word = document.getElementById("SUPW").value
	let first_name = document.getElementById("SUFN").value
	let last_name = document.getElementById("SULN").value
}
async function handleClickSignUp() {
	let user_name = document.getElementById("SUUN").value
	let pass_word = document.getElementById("SUPW").value
	let first_name = document.getElementById("SUFN").value
	let last_name = document.getElementById("SULN").value

	fetch('', {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''})
}
