function load_groups() {
	let content = document.getElementById("content");

	if(groups) {
		content.innerHTML = groups;
		return;
	}

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let c;

			c = "<input type='button' class='button' value='back' id='button_back' onclick='search_results_hidden()'>";
			c += "<input type='text' placeholder='type a name to search' id='text_search_user' onfocus='search_results_visible()'>";
			c += "<input type='button' class='button' value='search' id='button_search_user' onclick='search_user()'>";

			c += "<div id='search_results'></div>";
			c += "<div id='chat_list'>";

			let r = new Array();
			r = JSON.parse(this.responseText);

			/*let s = new Array();
			s = JSON.parse(result);*/

			let i = 0;
			//let s;
			while(s = r[i]) {
				//s = JSON.parse(r[i]);

				//let s = result['chats'][i];

				//let s = r[i];
				let path = s.extension ? "../data/profile_pictures/" + s.user_name + "." + s.extension : "../media/images/place_holder3.png";

				c += "<div class='chat' onclick='show_messages(this, " + s.user_name + ")'>";
				c += "<img src='" + path + "'>";
				c += s.user_name + " " + s.first_name + " " + s.last_name;
				c += "</div>";
				//});
				i++;
			}
			c += "</div>";

			c += "<div id='header'></div>";

			c += "<input type='text' placeholder='enter key of this conversation' id='text_key' value='1'>";
			c += "<input type='button' value='encrypt / decrypt' id='button_e_d' onclick='e_d()'>";

			c += "<div id='messages_list'>";
			c += "select any chat to show your messages with them here";
			c += "</div>";

			c += "<input type='button' value='check for new messages' id='button_check_for_new_messages' onclick='check_for_new_messages()'>";
			c += "<input type='text' placeholder='type a new message' id='text_new_message' onfocus='add_event()' onblur='remove_event()'>";
			c += "<input type='button' value='send' id='button_new_message' onclick='send_new_message()'>";

			chats = c;
			content.innerHTML = c;



			BB = document.getElementById("button_back");
			TSU = document.getElementById("text_search_user");
			BSU = document.getElementById("button_search_user");

			SR = document.getElementById("search_results");

			CL = document.getElementById("chat_list");

			CWH = document.getElementById("header");

			TK = document.getElementById("text_key");
			BED = document.getElementById("button_e_d");

			ML = document.getElementById("messages_list");

			BCNM = document.getElementById("button_check_for_new_message");
			TNM = document.getElementById("text_new_message");
			BNM = document.getElementById("button_new_message");

			if(resources) {
				//TSU.setAttribute(onkeyup:'SearchUser(this.value)');
				//don't know this works or not
				//alternatively i can simply add event listener

				TSU.addEventListener("keyup",function(e) {
					search_user();
				});
			}
		}
	};
	//xmlhttp.setRequestHeader("Access-Control-Allow-Origin": "*");
	xmlhttp.open("POST", "load_chats.php", true);
	xmlhttp.send();
}
