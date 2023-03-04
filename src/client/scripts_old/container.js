class Container {
	static menus = ['home', 'chats', 'groups', 'channels', 'profiles', 'games'];
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
	load() {
	}
	load_data() {
	}
}
