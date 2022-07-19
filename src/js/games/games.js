function load_games() {
    let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("container").innerHTML = this.responseText;
		}
	};
	xmlhttp.open("POST", "../python/games/load_games.py", true);
	xmlhttp.send();
}
