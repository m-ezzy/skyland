class Content {      //filename - class name itself, class, properties, constructor
	constructor(number, name) {
		//super();

		this.number = number;
		//this.name = menu_bar.menus[this.number].split("s");
		this.name = name;
		this.names = this.name + "s";   //menu_bar.menus[number]

		this.menu = document.getElementsByClassName("bar menu")[0].getElementsByTagName("div")[number];
		this.element = document.getElementsByClassName("content")[number];
		console.log(this.element)

		this.loaded = 0;
		this.is_open = 0;
		this.current = 0;

		this.previous = {};

		this.place_holder =  "media/images/place_holder/" + this.names + ".png";

		this.handle = {
			click: {},
			input: {},
			scroll: {},
			focus: {},
			blur: {},
		}

		this.details
		this.di
		this.dt
	}
	static instances = [];
	static current = 0;   //0 //{} //should this be array index number OR hold reference to object itself
}
