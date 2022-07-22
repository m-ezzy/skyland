class Games extends Content {
	constructor(who) {
		super(who);
	}
	async load() {
		super.load();

		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("games").innerHTML = this.responseText;
			}
		};
		xmlhttp.open("POST", "src/python/games/load.py", true);
		xmlhttp.send();
	}
	
}
