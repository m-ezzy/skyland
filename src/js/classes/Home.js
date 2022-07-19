class Home extends Content {
	constructor(who) {
		super(who);

		this.ud;

		this.load();
	}
	async load() {
		let response = await fetch("../php/" + this.who + "/load.php", {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let result = await response.json();

		let h;
		h = "<div class='button back' onclick='" + this.who + ".hide_search_results()'> back </div>";
		h += "<input type='text' class='text search' placeholder='search everything' onfocus='" + this.who + ".show_search_results()' oninput='" + this.who + ".search()'>";
		h += "<div class='button search' onclick='" + this.who + ".search()'> search </div>";

		h += "<div class='search_results'></div>";
		h += "<div class='previous_list' id='my_profile'>";

		if(result.extension) {
			h += "<img src='../../data/profile_pictures/" + result.user_name + "." + result.extension + "' id='profile_picture'>";
		} else {
			h += "<input type='file' name='file_pp' id='file_pp'>";
			h += "<input type='button' value='upload picture to server' id='button_pp' onclick='home.upload_profile_picture()'>";
		}

		h += "<br>" + result.user_name + "<br>" + result.first_name + "<br>" + result.last_name;
		h += "</div>";
		h += "<div class='updates'></div>";
		h += "<div class='updates'></div>";
		h += "<div class='updates'></div>";
		h += "<div class='updates'></div>";
		h += "<div class='updates'></div>";
		this.element.innerHTML = h;
		
		me = result;

		this.sr = this.element.getElementsByClassName('search_results')[0];
		this.pl = this.element.getElementsByClassName('previous_list')[0];
		this.ud = this.element.getElementsByClassName('updates');
	}
	upload_profile_picture() {
		let xhr = new XMLHttpRequest();
	
		let file = document.getElementById('file_pp').files[0];

		let fd = new FormData();
		fd.append("file_pp", file);
	
		xhr.open("POST", "../php/home/upload_profile_picture.php", true);
		//xhr.setRequestHeader("Content-type","image");
		xhr.send(fd);
	
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				this.pl.removeChild(document.getElementById("file_pp"));
				this.pl.removeChild(document.getElementById("button_pp"));

				this.pl.innerHTML = "<img src='../../data/profile_pictures/" + me.user_name + "." + this.responseText + "' id='profile_picture'>";
				me.extension = this.responseText;
			}
		};
	}
}
