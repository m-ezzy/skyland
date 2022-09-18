let chats = {
	number: 1,
	name: "chat",
	names: menu_bar.menus[1],

	menu: document.getElementsByClassName("menu_bar")[0].getElementsByTagName("div")[1],
	element: document.getElementsByClassName("content")[1],

	loaded: 0,
	is_open: 0,
	current: 0,
	
	previous: {},
	place_holder:  "media/images/place_holder/chats.png",

	last_known: 1, //to check if history still loading

	sr: '',
	pl: '',
	cb: '',
	ch: '',
	ca: '',
	cv: '',
	tk: '',
	bed: '',

	handle: {
		click: {},
		input: {},
		scroll: {},
		focus: {},
		blur: {},
	},
};
