class Games extends Content {
	constructor(who) {
		super(who);
	}
	async load() {
		super.load();
		
		console.log(this);

		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//document.getElementById("games").innerHTML = this.responseText;
				console.log(this.responseText);
			}
		};
		xmlhttp.open("POST", "src/python/server.py", true);
		xmlhttp.send();
	}
	
}
