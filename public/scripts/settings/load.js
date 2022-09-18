settings.load = async function() {
	this.element.style.display = 'grid';

	let response = await fetch(backEnd.pre + "settings/load" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
	let data = await response.json();
	console.log(data);
	me = data.json;
	this.element.innerHTML = data.html;

	this.bl = this.element.getElementsByClassName('bar list')[0];
	this.bb = this.element.getElementsByClassName('button back')[0];
	this.ts = this.element.getElementsByClassName('text search')[0];
	this.bs = this.element.getElementsByClassName('button search')[0];
	this.ls = this.element.getElementsByClassName('list search')[0];
	this.lp = this.element.getElementsByClassName('list previous')[0];
	this.ipp = this.element.getElementsByClassName('image pp')[0];
	this.fpp = this.element.getElementsByClassName('file pp')[0];
	this.bpp = this.element.getElementsByClassName('button pp')[0];

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
