function load_home() {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let h;

			/*let un = <?php echo $_SESSION['user_name'] ?>;*/

			//let e = document.createElement("div");
			//e.className = className;
			//NewElement.id = id;

			//let textNode = document.createTextNode(text);
			//NewElement.appendChild(textNode);

			//return NewElement;

			let result = JSON.parse(this.responseText);

			if(result.extension == null || result.extension == "") {
				//let input = create_element("input", "", "file_pp", "");
				//input.addAttribute();

				h = "<input type='file' name='file_pp' id='file_pp'>";
				h += "<input type='button' value='upload picture to server' id='button_pp' onclick='upload_profile_picture()'>";
			} else {
				//create_element("img", "", "profile_picture", "");

				h = "<img src='../../data/profile_pictures/" + result.user_name + "." + result.extension + "' id='profile_picture'>";
			}
			h += "<br>" + result.user_name + "<br>" + result.first_name + "<br>" + result.last_name;

			me.user_name = result.user_name;

			home.innerHTML = h;

			menu.current = "home";
		}
	};
	xhr.open("POST", "../php/home/load_home.php", true);
	xhr.send();
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

			CO.innerHTML = "<img src='../../data/profile_pictures/" + this.responseText + "' id='profile_picture'>";
		}
	};
}
function show_profile() {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			CH.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("POST", "../php/home/show_profile_picture.php?q=" + 0, true);
	xmlhttp.send();
}
