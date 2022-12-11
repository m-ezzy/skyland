Account.prototype.load = async function() {
	this.element.style.display = 'grid';

	let response = await fetch(backEnd.pre + "account/load" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
	let data = await response.json();
	console.log(data);

	configs.me.user_id = data.json;
	this.element.innerHTML = data.html;

	this.initialize();
	//this.handle_click_prev(0);

	localStorage.setItem('user_id', data.json.user_id);
	sessionStorage.setItem('user_id', data.json.user_id);
	console.log(localStorage.getItem('user_id'));
	console.log(sessionStorage.getItem('user_id'));

	/*
	let path;
	if (result.extension) {
		this.pp.src = 'data/profile_pictures/' + result.user_name + "." + result.extension;
	}
	this.pl.innerHTML += "<br> user id : " + result.user_id + "<br> user name : " + result.user_name + "<br> first name : " + result.first_name + "<br> last name : " + result.last_name;
	this.loaded = 1;
	*/
}
