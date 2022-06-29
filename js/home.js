function load_home() {
	/*
	SB = document.getElementById("side_bar");
	C = document.getElementById("content");

	let content = document.getElementById("content");
	console.log(con);*/

	if(home) {
		content.innerHTML = home;
		return;
	}
	/*sb.innerHTML = "";
	c.innerHTML = "";*/

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			/*let un = <?php echo $_SESSION['user_name'] ?>;*/

			//let e = document.createElement("div");
			//e.className = className;
			//NewElement.id = id;

			//let textNode = document.createTextNode(text);
			//NewElement.appendChild(textNode);

			//return NewElement;

			let result = JSON.parse(this.responseText);

			if(result.extension == null || result.extension == "") {
				home = "<input type='file' name='file_pp' id='file_pp'>";
				home += "<input type='button' value='upload picture to server' id='button_pp' onclick='upload_profile_picture()'>";
			} else {
				home = "<img src='../data/profile_pictures/" + result.user_name + "." + result.extension + "' id='profile_picture'>";
			}
			home += "<br>" + result.user_name + "<br>" + result.first_name + "<br>" + result.last_name;

			content.innerHTML = home;

			//SB = document.getElementById("side_bar");
			//C = document.getElementById("content");
		}
	};
	xmlhttp.open("POST", "load_home.php", true);
	xmlhttp.send();
}
