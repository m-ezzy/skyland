let chats1 = {
	who: menu_bar.menus[1],
	who1: chats.who.substring(0, chats.who.length - 1),
	element: document.getElementById(chats.who),
	loaded: 0,
	open: 0,
	current: -1,
	
	previous: {},
	place_holder:  "media/images/place_holder/chats.png",

	sr: '',
	pl: '',
	cb: '',
	ch: '',
	ca: '',
	cv: '',
	tk: '',
	bed: '',

	load: function() {},
}
chats1.search = function() {}

let Chats2 = function() {
	this.who = menu_bar.menus[1];
	this.who1 = chats.who.substring(0, chats.who.length - 1);
	this.element = document.getElementById(chats.who);
	this.loaded = 0;
	this.open = 0;
	this.current = -1;

	this.previous = {};
	this.place_holder = "media/images/place_holder/chats.png";

	this.sr = '';
	this.pl = '';
	this.cb = '';
	this.ch = '';
	this.ca = '';
	this.cv = '';
	this.tk = '';
	this.bed = '';

	this.load = function() {};
}
Chats2.prototype.search() = function() {}

class Chats3 {
	constructor() {
		this.who = menu_bar.menus[1];
		this.who1 = chats.who.substring(0, chats.who.length - 1);
		this.element = document.getElementById(chats.who);
		this.loaded = 0;
		this.open = 0;
		this.current = -1;
		
		this.previous = {};
		this.place_holder =  "media/images/place_holder/chats.png";

		this.sr = '';
		this.pl = '';
		this.cb = '';
		this.ch = '';
		this.ca = '';
		this.cv = '';
		this.tk = '';
		this.bed = '';
	}
	load() {}
}
Chats3.prototype.search() = function() {}

let chats2 = new Chats2();
let chats3 = new Chats3();
