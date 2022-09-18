function getCookie(cookie_key) {
	const name = cookie_key + "=";
	const cDecoded = decodeURIComponent(document.cookie); //to be careful
	const cArr = cDecoded.split('; ');
	let res = '';
	cArr.forEach(val => {
		if (val.indexOf(name) === 0) {
			res = val.substring(name.length);
		}
	});
	return res;
}

if(getCookie('user_id') == '') {
	//console.log(cookie);
	location.href = 'auth.html';
}
