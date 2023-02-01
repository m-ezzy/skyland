import handle_click_menu from './handle_click_menu'

export default class Content {      //filename - class name itself, class, properties, constructor
	constructor(number, name) {
		//super();
		this.number = number
		//this.name = menu_bar.menus[this.number].split("s")
		this.name = name
		this.names = this.name + "s"   //menu_bar.menus[number]

		this.loaded = 0
		this.is_open = 0
		this.current = 0
		this.conv = {} //previous //prev //conv //0 //{}

		this.place_holder =  "/media/images/place_holder/" + this.names + ".png" //take this property to trio

		this.e = {
			menu: document.getElementsByClassName("bar menu")[0].getElementsByTagName("div")[number],
			content: document.getElementsByClassName(`item content ${this.names}`)[0],
			bar: {},
			l: {},
			b: {},
			t: {},
			f: {},
			detail: {},
			info: {},
		}
		this.handle = { //handler //handlers //handle //eh //event_handlers
			click: {},
			input: {},
			scroll: {},
			focus: {},
			blur: {},
		}
	}
	initialize() {
		console.log('content initialize')
		// this.e.content = document.getElementsByClassName(`item content ${this.names}`)[0]
	}
	static instances = {}
	static current = 0   //0 //{} //should this be array index number OR hold reference to object itself
	static place_holder = {
		users: "/media/images/place_holder/users.png",
		groups: "/media/images/place_holder/groups.png",
		channels: "/media/images/place_holder/channels.png"
	}
	handle_click_menu = handle_click_menu.bind(this)
	// handle_click_menu() {
		// handle_click_menu.bind(this).call()
	// }
}
