Account.prototype.upload_profile_picture = async function() {
	const form_data = new FormData();
	console.log(form_data);
	console.log(this.fpp);
	let file = this.fpp.files[0];
	form_data.append("file_pp", file);
	console.log(form_data);

	let response = await fetch("/account/upload_profile_picture", {method: 'POST', body: form_data});
	console.log(response);

	/*let ab = await response.arrayBuffer();
	console.log(ab);
	this.ipp.src = ab;*/
	/*let b = await response.arrayBuffer();
	console.log(b);
	this.ipp.src = getCookie('user_id') + '.png';*/
	/*let json = await response.json();
	console.log(json);*/
	/*let text = await response.text();
	console.log(text);
	this.ipp.src = text;*/
	
	//me.extension = text;
	this.fpp.style.display = 'none';
	this.bpp.style.display = 'none';

	//document.getElementById('profile_picture').src = "data/profile_pictures/" + me.user_name + "." + text;
}
