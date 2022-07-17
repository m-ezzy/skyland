function search_user() {
	let s = chats.ts.value;
	if(s == "") {
		console.log(s + "23");
		return;
	}
	console.log(s);

	chats.sr.innerHTML = "";
	chats.sr.style.visibility = "visible";

	let pre = [];
	for (let i=0 ; i<chats.previous.length ; i++) {
		let un = chats.previous[i].user_name.search(s);
		let fn = chats.previous[i].first_name.search(s);
		let ln = chats.previous[i].last_name.search(s);

		console.log(un + fn + ln);

		if (un != -1 || fn != -1 || ln != -1) {
			pre.push(chats.previous[i]);
		}
	}
	if (pre.length) {
		//add banner showing already created chats
		chats.sr.appendChild(create_div("chat", "", "", "your previous chats"));
	}
	for (let i = 0 ; i < pre.length ; i++) {
		let img = document.createElement("img");
		img.src = pre[i].extension ? "../../data/profile_pictures/" + pre[i].user_name + "." + pre[i].extension : "../../media/images/place_holder3.png";

		let oc = "take_to_that_chat(this," + pre[i].user_name + ")";
		let text = pre[i].user_name + " " + pre[i].first_name + " " + pre[i].last_name;
		let temp = create_div("chat", "", oc, text);

		temp.appendChild(img);
		chats.sr.appendChild(temp);
	}

	console.log("503");
	console.log(s);

	do_amazing_animation("25vw", "0vh", "5vw", "10vh");

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let r = new Array();
			r = JSON.parse(this.responseText);

			console.log(this.responseText);
			console.log(r);

			if (r.length) {
				//add banner showing chats with whom no previous communication
				chats.sr.appendChild(create_div("chat", "", "", "start a new chat"));
			}
			for (let i = 0 ; i < r.length ; i++) {
				let img = document.createElement("img");
				img.src = r[i].extension ? "../../data/profile_pictures/" + r[i].user_name + "." + r[i].extension : "../../media/images/place_holder3.png";

				let oc = "create_new_chat(" + r[i].user_name + ",'" + r[i].first_name + "','" + r[i].last_name + "','" + r[i].extension + "')";
				let text = r[i].user_name + " " + r[i].first_name + " " + r[i].last_name;
				let temp = create_div("chat", "", oc, text);
				//temp.onclick = oc;

				console.log(temp);

				temp.appendChild(img);
				chats.sr.appendChild(temp);
			}
			if (pre.length == 0 && r.length == 0) {
				//SR.innerHTML = "<div class='chat'> no such user found </div>";
				chats.sr.appendChild(create_div("chat", "", "", "no such user found"));
			}
		}
	};
	xhr.open("GET", "../php/chats/search_user.php?q=" + s, true);
	xhr.send();
}
