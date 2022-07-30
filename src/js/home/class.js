class Home extends Content {
	constructor(who) {
		super(who);

		this.pp;
		this.fpp;
		this.bpp;
		this.ud;
	}
	load() {
		super.load();

		let div = create_div('previous_list', 'my_profile', '', '');
		let img = create_image('', 'profile_picture', '', this.place_holder, Common.w, Common.h);
		div.appendChild(img);
		this.element.appendChild(div);

		this.pl = this.element.getElementsByClassName('previous_list')[0];
		this.pp = document.getElementById('profile_picture');

		let f = document.createElement('input');
		f.setAttribute('type','file');
		f.setAttribute('name','file_pp');
		f.setAttribute('id','file_pp');
		this.pl.appendChild(f);
		
		this.fpp = document.getElementById('file_pp');

		div = create_div('button', 'button_pp', this.who + '.upload_profile_picture()', 'upload profile picture');
		this.pl.appendChild(div);
		
		this.bpp = document.getElementById('button_pp');

		for (let i = 0 ; i < Content.menus.length ; i++) {
			let div = create_div('updates', '', '', '');
			this.element.appendChild(div);
		}
		this.ud = this.element.getElementsByClassName('updates');
	}
	async load_data() {
		super.load_data();

		let response = await fetch("src/php/" + this.who + "/load.php", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let result = await response.json();

		let path;
		if (result.extension) {
			this.pp.src = 'data/profile_pictures/' + result.user_name + "." + result.extension;
		}
		
		this.pl.innerHTML += "<br>" + result.user_name + "<br>" + result.first_name + "<br>" + result.last_name;

		this.loaded = 1;

		me = result;
	}
	async upload_profile_picture() {
		const fd = new FormData();
		let file = document.getElementById('file_pp').files[0];
		console.log(file);
		fd.append("file_pp", file);
		console.log(fd);
		let response = await fetch("src/php/home/upload_profile_picture.php", {
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
