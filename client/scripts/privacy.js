export function encryption(plain, key) {
	key = parseInt(key)
	let cipher = ""

	console.log(key)
	if(key == 0 || key == '' || key == undefined || isNaN(key)) {
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
export function decryption(cipher, key) {
	key = parseInt(key)
	let plain = ""

	console.log(plain, cipher, key)
	if(key == 0 || key == '' || key == undefined || isNaN(key)) {
		return cipher
	}
	let aaa
	let bbb = ''

	for(let i=0 ; i<cipher.length ; i++) {
		aaa = cipher.charCodeAt(i) - key
		bbb = String.fromCharCode(aaa)
		plain += bbb
	}
	return plain
}
function e_d() {

}


