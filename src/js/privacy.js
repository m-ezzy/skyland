function encryption(plain) {
	let cipher = "";
	let key = parseInt(TK.value);

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
function decryption(cipher) {
	let plain = "";
	let key = parseInt(TK.value);

	if(key == "") {
		return;
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