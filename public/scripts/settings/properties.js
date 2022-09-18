let settings = {
	number: 4,

	name: "setting",
	names: "settings",
	//number: menu_bar.menus.findIndex("settings"),

	menu: document.getElementsByClassName("menu_bar")[0].getElementsByTagName("div")[4],
	element: document.getElementsByClassName("content")[4],

	loaded: 0,
	open: 0,
	current: 0,
	
	previous: {},
	place_holder:  "media/images/place_holder/user.png",

	sr: '',
	pl: '',
    ipp: '',
    fpp: '',
    bpp: ''
};
