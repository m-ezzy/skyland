function encryption(plain, key) {
	key = parseInt(key);
	let cipher = "";

	if(key == 0) {
		return plain;
	}

	let aaa;
	let bbb;
	
	//let pl = TNM.value;
	//alert(plain);

	for(let i=0 ; i<plain.length ; i++) {
		aaa = plain.charCodeAt(i) + key;
		//alert(aaa);
		bbb = String.fromCharCode(aaa);
		cipher = cipher + bbb;
	}

	return cipher;
}
function decryption(cipher, key) {
	key = parseInt(key);
	let plain = "";

	if(key == 0) {
		return cipher;
	}

	console.log(key);

	let aaa;

	for(let i=0 ; i<cipher.length ; i++) {
		aaa = cipher.charCodeAt(i) - key;
		plain = plain + String.fromCharCode(aaa);

		console.log(plain);
	}
	return plain;
}
function e_d() {

}


