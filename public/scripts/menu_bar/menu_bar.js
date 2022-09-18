let menu_bar = {
	element: document.getElementsByClassName("menu_bar")[0],
	elements: document.getElementsByClassName('menu_bar')[0].getElementsByTagName("div"),
	button_theme: document.getElementById("button_theme"),

	menus: ['calls', 'chats', 'groups', 'channels', 'games', 'profiles'],

	foo() {
		console.log('lololololololololololololololo');
		console.log(this);
	}
};

menu_bar.foo();

menu_bar.hi = function() {
	console.log('hohohohohohohoohohoohohohohohohohho');
	console.log(this);
};

menu_bar.foo();
menu_bar.hi();

/*
let Menu_Bar = function() {
	this.element = document.getElementById('menu_bar');
	this.menus = ['calls', 'chats', 'groups', 'channels', 'games'];

	this. () => {
		console.log('lololololololololololololololo');
	}
};

menu_bar.prototype.hi = () => {
	console.log('hohohohohohohoohohoohohohohohohohho');
};
*/
