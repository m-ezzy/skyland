class Calls {
	constructor() {
	//let Calls = function() {
		//super();

		this.number = 0;
		//this.name = menu_bar.menus[this.number].split("s");
		this.name = "call";
		this.names = this.name + "s";
		this.menu = document.getElementsByClassName("menu_bar")[0].getElementsByTagName("div")[this.number];
		this.element = document.getElementsByClassName("content")[this.number];

		this.loaded = 0;
		this.is_open = 0;
		this.current = 0;

		this.previous = {};

		this.place_holder =  "media/images/place_holder/" + this.names + ".png";

		this.bl;
		this.bb;
		this.ts;
		this.bs;
		this.ls;
		this.lp;
		
		this.bc;
		this.ch;

		this.conv;
		this.ar;
		this.vl;
		this.vr;

		this.bca;
		this.bcd;
		this.bce;

		this.peer_id_local;
		this.peer_id_remote;
		this.call_incoming;
		this.call_outgoing;

		this.conn;
	}
}
