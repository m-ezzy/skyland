class Content {
	static menus = ['home', 'chats', 'groups', 'channels', 'games'];
	static current;

	static bb = document.getElementsByClassName('button back')[0];
	static ts = document.getElementsByClassName('text search')[0];
	static bs = document.getElementsByClassName('button search')[0];

	constructor(who) {
		this.who = who;
		this.element = document.getElementById(this.who);
		this.loaded = 0;
		this.open = 0;
		this.current = -1;
		this.previous = {};

		this.place_holder =  "media/images/place_holder/" + this.who + ".png";

		this.sr;
		this.pl;

		this.cb;
		this.ch;
	}
	load() {
		this.loaded = 1;

		let c = "";
		c += "<div class='search_results'></div>";
		c += "<div class='previous_list'></div>";
		
		c += "<div class='conversation_bar'>";
			c += "<div class='current_header'>";
				c += "<div class='details'></div>"
			c += "</div>";
		c += "</div>";
		this.element.innerHTML = c;

		this.sr = this.element.getElementsByClassName("search_results")[0];
		this.pl = this.element.getElementsByClassName("previous_list")[0];

		this.cb = this.element.getElementsByClassName("conversation_bar")[0];
		this.ch = this.element.getElementsByClassName("current_header")[0];
	}
	async load_data() {
	}
	clicked() {
		if (this.loaded == 0) {
			this.load();
			this.load_data();
		}
		
		this.element.style.display = "grid";
		/*
		if (this.element.style.display != "none") {
			console.log(this.element.style.display);
			return;
		}*/

		if (Content.current) {
			if (Content.current.who == 'chats' || Content.current.who == 'groups' || Content.current.who == 'channels') {
				if (Content.current.current != -1) {
					document.getElementById(`conversation_${Content.current.who}_${Content.current.current}`).style.display = 'none';
					//Content.current.conversation[Content.current.current].style.display = 'none';
				}
				if (['chats', 'groups'].includes(Content.current.who)) {
					Chats_Groups.snm.style.display = 'none';
				}
			}

			MB.getElementsByTagName('div')[menus.indexOf(Content.current.who)].style.backgroundColor = 'var(--bg)';
			
			Content.current.sr.style.display = 'none';
			Content.current.element.style.display = 'none';
		}

		Content.current = this;
		this.element.style.display = "grid";

		MB.getElementsByTagName('div')[menus.indexOf(this.who)].style.backgroundColor = 'black';
	}
	hide_search_results() {
		this.sr.style.display = "none";
	}
	show_search_results() {
		this.sr.style.display = "grid";
	}
	search() {
		this.sr.style.display = "grid";
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
