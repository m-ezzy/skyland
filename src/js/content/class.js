class Content {
	static menus = ['home', 'chats', 'groups', 'channels', 'games', 'market'];
	static current;

	constructor(who) {
		this.who = who;
		this.element = document.getElementById(this.who);
		this.innerHTML = "";
		this.loaded = 0;
		this.open = 0;
		this.current = -1;
		this.previous = [];

		this.place_holder =  "media/images/place_holder_" + this.who + ".png";

		this.bb;
		this.ts;
		this.bs;
		this.sr;
		this.pl;
	}
	clicked() {
		if (this.loaded == 0) {
			Content.current = home;

			this.load();
			//this.init();
			console.log(this.sr);
		}
		if (this.element.style.visibility == "visible") {
			return;
		}

		console.log(this.sr);

		Content.current.sr.style.visibility = 'hidden';
		Content.current.element.style.visibility = 'hidden';

		if (Content.current == chats || Content.current == groups || Content.current == channels) {
			if (Content.current.current != -1) {
				Content.current.conversation[Content.current.current].style.visibility = 'hidden';
			}
		}

		Content.current = this;
		this.element.style.visibility = "visible";

		if (Content.current.current != -1) {
			Content.current.conversation[Content.current.current].style.visibility = 'visible';
		}
	}
	hide_search_results() {
		this.sr.style.visibility = "hidden";
	}
	show_search_results() {
		this.sr.style.visibility = "visible";
	}
}
