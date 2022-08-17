class Profiles extends Content {
	constructor(who) {
		super(who);

		this.pp;
		this.fpp;
		this.bpp;
	}
	load() {
		super.load();

		this.pl.appendChild(create_image('', 'profile_picture', '', this.place_holder, Common.w, Common.h));

		this.pp = document.getElementById('profile_picture');

		let f = document.createElement('input');
		f.setAttribute('type','file');
		f.setAttribute('name','file_pp');
		f.setAttribute('id','file_pp');
		this.pl.appendChild(f);
		
		this.fpp = document.getElementById('file_pp');

		let div = create_div('button', 'button_pp', this.who + '.upload_profile_picture()', 'upload profile picture');
		this.pl.appendChild(div);
		
		this.bpp = document.getElementById('button_pp');
	}
	async load_data() {
		await super.load_data();

		let response = await fetch("src/php/" + this.who + "/load.php", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let result = await response.json();

		console.log(result);

		sessionStorage.setItem('user_id', result.user_id);

		console.log(localStorage.getItem('user_id'));
		console.log(sessionStorage.getItem('user_id'));

		let path;
		if (result.extension) {
			this.pp.src = 'data/profile_pictures/' + result.user_name + "." + result.extension;
		}

		console.log(this.pl.innerHTML);
		this.pl.innerHTML += "<br> user id : " + result.user_id + "<br> user name : " + result.user_name + "<br> first name : " + result.first_name + "<br> last name : " + result.last_name;
		console.log(this.pl.innerHTML);

		this.loaded = 1;

		me = result;
	}
	clicked() {
		super.clicked();
	}
	async upload_profile_picture() {
		const fd = new FormData();
		let file = document.getElementById('file_pp').files[0];
		console.log(file);
		fd.append("file_pp", file);
		console.log(fd);
		let response = await fetch("src/php/profiles/upload_profile_picture.php", {
			method: 'POST',
			body: fd
		});
		let text = await response.text();

		me.extension = text;
		console.log(text);
		this.fpp.style.visibility = 'hidden';
		this.bpp.style.visibility = 'hidden';

		document.getElementById('profile_picture').src = "data/profile_pictures/" + me.user_name + "." + text;
	}
}
