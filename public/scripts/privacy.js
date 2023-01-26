function encryption(plain, key) {
	key = parseInt(key)
	let cipher = ""

	console.log(key)
	if(key == 0 || key == '' || key == undefined || key == NaN) {
		return plain
	}
	console.log(key)

	let aaa
	let bbb

	//let pl = TNM.value
	//alert(plain)

	for(let i=0 ; i<plain.length ; i++) {
		aaa = plain.charCodeAt(i) + key
		//alert(aaa)
		bbb = String.fromCharCode(aaa)
		cipher = cipher + bbb
	}
	return cipher
}
function decryption(cipher, key) {
	key = parseInt(key)
	let plain = ""

	if(key == 0) {
		return cipher
	}

	let aaa

	for(let i=0 ; i<cipher.length ; i++) {
		aaa = cipher.charCodeAt(i) - key
		plain = plain + String.fromCharCode(aaa)

		console.log(plain)
	}
	return plain
}
function e_d() {

}


