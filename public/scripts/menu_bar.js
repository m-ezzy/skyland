/*
let menu_bar = {
	element: document.getElementsByClassName("bar menu")[0],
	elements: document.getElementsByClassName('bar menu')[0].getElementsByTagName("div"),
	button_theme: document.getElementById("button_theme"),

	menus: ['calls', 'chats', 'groups', 'channels', 'account'],

	foo() {
		console.log(foo, this);
	},
	bar: () => {
		console.log(bar, this);
	}
};
menu_bar.hi = function() {
	console.log(hi, this);
};
menu_bar.foo();
menu_bar.bar();
menu_bar.hi();
*/
/*
let MenuBar = function() {
	this.element = document.getElementById('menu_bar');
	this.menus = ['calls', 'chats', 'groups', 'channels', 'games'];

	this.hello = () => {
		console.log('helloooooooooo');
	}
};
MenuBar.prototype.hi = () => {
	console.log('hiiiiiiiiiiiiiiiii');
};
*/

class MenuBar {
	constructor() {
		this.element = document.getElementsByClassName("bar menu")[0]
		this.elements = document.getElementsByClassName("bar menu")[0].getElementsByTagName("div")
		this.button_theme = document.getElementById("button_theme")
		this.menus = ['calls', 'chats', 'groups', 'channels', 'account']
	}/*
	async handle_click_menu(number) {
		if (Content.current.number == Content.instances[number]) {return;} //OR
		if (Content.instances[number].is_open) {return;}
		if (Content.instances[number].loaded == 0) {
			//fetchs[this.names].load()
			Content.instances[number].element.innerHTML = await fetchs('chats/load', '');
			Content.instances[number].loaded = 1;
		}
		if (Content.current) {
			Content.current.is_open = 0;
			Content.current.element.style.display = 'none';
			//Content.current.menu.style.backgroundColor = 'var(--bg)';
			this.elements[Content.current.number].style.backgroundColor = "var(--mb-bg)";
		}
		Content.current = Content.instances[number];

		Content.instances[number].is_open = 1;
		Content.instances[number].element.style.display = "flex";
		this.elements[number].style.backgroundColor = 'var(--item-bg)';
		//this.elements[number].style.color = 'var(--item-selected-text)';
	}*/
}
