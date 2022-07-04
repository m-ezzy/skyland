function load_home() {
	/*
	SB = document.getElementById("side_bar");
	C = document.getElementById("content");

	let content = document.getElementById("content");
	console.log(con);*/

	if(content.home) {
		C.innerHTML = content.home;
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

			me.user_name = result.user_name;

			C.innerHTML = home;

			//SB = document.getElementById("side_bar");
			//C = document.getElementById("content");
		}
	};
	xmlhttp.open("POST", "../php/home/load_home.php", true);
	xmlhttp.send();
}


function upload_profile_picture() {
	let xhr = new XMLHttpRequest();

	let file = document.getElementById('file_pp').files[0];
	
	let fd = new FormData();
	fd.append("file_pp", file);

	xhr.open("POST", "../php/home/upload_profile_picture.php", true);
	//xhr.setRequestHeader("Content-type","image");
	xhr.send(fd);

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200) {
			/*C.removeChild(document.getElementById("file_pp"));
			C.removeChild(document.getElementById("button_pp"));*/

			C.innerHTML = "<img src='../data/profile_pictures/" + this.responseText + "' id='profile_picture'>";
		}
	};
}
function show_profile() {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			CWH.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("POST", "../php/home/show_profile_picture.php?q=" + 0, true);
	xmlhttp.send();
}
