function load_chats(t) {
	if (Content.current != chats) {
		Content.current.element.style.visibility = "hidden";
		Content.current = chats;
		chats.element.style.visibility = "visible";

		if (chats.loaded_already != 1) {
			chats.loaded_already = 1;
		
			let c;
			c = "<div class='button back' onclick='hide_search_results()'> back </div>";
			c += "<input type='text' class='text search' placeholder='type here to search' onfocus='show_search_results()' " + a + ">";
			c += "<div class='button search' onclick='search_user()'> search </div>";

			c += "<div class='search_results'></div>";
			c += "<div class='chat_list'></div>";

			c += "<div class='current_header'></div>";

			c += "<input type='text' class='text key' placeholder='enter key of this conversation' value='0'>";
			c += "<div class='button key' onclick='e_d()'> encrypt / decrypt </div>";
			chats.element.innerHTML = c;

			chats.initialize();

			const response = await fetch("../php/chats/load_chats.php", {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
			let result = response.json();

			result.forEach(r => function() {
				let path = r.extension ? "../../data/profile_pictures/" + r.user_name + "." + r.extension : "../../media/images/place_holder3.png";

				let div = create_div("", "", "show_conversation(this,'" + s.user_name + "')", r.user_name + " " + r.first_name + " " + r.last_name);
				let img = create_image("", "", "", path);
				div.appendChild(img);
				chats.cl.appendChild(div);

				chats.element.appendChild(create_div("conversation", "chat_between_me_" + s.user_name, "", ""));
				let e = document.getElementById("chat_between_me_" + s.user_name);
				chats.previous.push({user_name: (s.user_name), first_name: (s.first_name), last_name: (s.last_name), extension: (s.extension), rows: -1, conversation: e});
			});

			chats.tk = chats.element.getElementsByClassName("text key")[0];
			chats.bk = chats.element.getElementsByClassName("button key")[0];
		}
	}
}
