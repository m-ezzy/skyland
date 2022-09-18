let groups = {
	number: 2,

	name: 'group',
	names: menu_bar.menus[2],

	menu: document.getElementsByClassName("menu_bar")[0].getElementsByTagName("div")[2],
	element: document.getElementsByClassName('content groups')[0],

	loaded: 0,
	open: 0,
	current: 0,
	
	previous: {},
	place_holder:  "media/images/place_holder/groups.png",

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
