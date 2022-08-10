class Content {
	static menus = ['home', 'chats', 'groups', 'channels', 'games'];
	static current;

	static bb = document.getElementsByClassName('button back')[0];
	static ts = document.getElementsByClassName('text search')[0];
	static bs = document.getElementsByClassName('button search')[0];
	static sr = document.getElementsByClassName('search_results')[0];

	constructor(who) {
		this.who = who;
		this.element = document.getElementById(this.who);
		this.innerHTML = "";
		this.loaded = 0;
		this.open = 0;
		this.current = -1;
		this.previous = [];

		this.place_holder =  "media/images/place_holder_" + this.who + ".png";

		this.pl;
	}
	load() {
		this.loaded = 1;
	}
	async load_data() {
	}
	clicked() {
		if (this.loaded == 0) {
			this.load();
			this.load_data();

			console.log(Content.sr);
		}/*
		if (this.element.style.display != "none") {
			return;
		}*/

		console.log(Content.sr);

		if (Content.current) {
			/*
			Content.bb.style.visibility = 'hidden';
			Content.ts.style.visibility = 'hidden';
			Content.bs.style.visibility = 'hidden';*/
			Content.sr.style.display = "none";
			Content.current.element.style.display = "none";
		}

		Content.current = this;
		this.element.style.display = "grid";

		if (Content.current.current != -1) {
			Content.current.conversation[Content.current.current].style.display = "grid";
		}
	}
	hide_search_results() {
		Content.sr.style.display = "none";
	}
	show_search_results() {
		Content.sr.style.display = "grid";
	}
	search() {
		Content.sr.style.display = 'grid';
		/*
		let w = Content.current.who;
		if (w == 'home') {
			home.search();
		} else if (w == 'chats') {
			chats.search();
		} else if (w == 'groups') {
			groups.search();
		} else if (w == 'channels') {
			channels.search();
		} else if (w == 'games') {
			games.search();
		}
		*/
	}
}
