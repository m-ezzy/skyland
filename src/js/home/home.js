
function show_profile() {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			CH.innerHTML = this.responseText;
		}
	};
	xhr.open("POST", "../php/home/show_profile_picture.php?q=" + 0, true);
	xhr.send();
}
