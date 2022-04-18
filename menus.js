document.body.onload = function() {
	load_skeleton();
	load_home();
}

function load_skeleton() {
	//console.log("5");
	
	let c = document.getElementById("container");
	//c.innerHTML = "";

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			c.innerHTML = this.responseText;
			//console.log(c);
			//console.log("99999");
		}
	};
	xmlhttp.open("POST", "load_skeleton.php", true);
	xmlhttp.send();
}

let home = {
	sb: "",
	c: "",
};
let menu_chats = {
	sb: "",
	c: "",
};
let menu_groups = "";
let menu_communities = "";
let menu_market = "";


function load_home() {
	/*
	SB = document.getElementById("side_bar");
	C = document.getElementById("content");
	*/
	
	let sb = document.getElementById("side_bar");
	let c = document.getElementById("content");
	//console.log(con);

	/*
	if(home.sb != "") {
		sb.innerHTML = menu_home.sb;
		c.innerHTML = "";
		return;
	}
	*/
	sb.innerHTML = "";
	c.innerHTML = "";
	
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
				home.sb = "<input type='file' name='file_pp' id='file_pp'>";
				home.sb += "<input type='button' id='button_pp' onclick='upload_profile_picture()'>";
			} else {
				home.sb = "<img src='data/ProfilePictures/" + result.user_name + "." + result.extension + "' id='pp'>";
			}
			home.sb += "<br>" + result.user_name + "<br>" + result.first_name + "<br>" + result.last_name;

			sb.innerHTML = home.sb;



			//SB = document.getElementById("side_bar");
			//C = document.getElementById("content");
		}
	};
	xmlhttp.open("POST", "load_home.php", true);
	xmlhttp.send();
}
function load_chats() {
	let sb = document.getElementById("side_bar");
	let c = document.getElementById("content");

	console.log("99");

	/*
	if(menu_chats.sb != null) {
		sb.innerHTML = menu_chats.sb;
		return;
	}
	*/
	
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("101");

			let csb;
			let cc;

			//csb = "<form>";
			csb = "<input type='button' value='Back' id='ButtonBack' onclick='search_results_hidden()'>";
			csb += "<input type='text' placeholder='Type a Name to Search' id='TextSearchUser' onfocus='search_results_visible()'>";
			csb += "<input type='button' value='Search' id='ButtonSearchUser' onclick='search_user()'>";
			//csb += "</form>";

			csb += "<div id='SearchResults'></div>";

			csb += "<div id='ChatList'>";

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

				csb += "<div class='chat' onclick='show_messages(" + s.user + ")'>";
				csb += "<img src='data/ProfilePictures/" + s.user + "." + s.extension + "'>";
				csb += s.user + " " + s.first_name + " " + s.last_name;
				csb += "</div>";
				//});
				i++;
			}

			csb += "</div>";

			cc += "<div id='chatting_with_header' onclick='ShowProfile()'>";
			cc += "</div>";

			cc += "<input type='text' placeholder='Enter key of this conversation' id='TextKey'>";
			cc += "<input type='button' value='Encrypt/Decrypt' id='ButtonED' onclick='ED()'>";

			cc += "<div id='MessagesList'>";
			cc += "Select any chat to show your messages with them here";
			cc += "</div>";

			//cc += "<form>";
			cc += "<input type='button' value='Check For New Messages' id='ButtonCheckForNewMessages' onclick='check_for_new_messages()'>";
			cc += "<input type='text' placeholder='Type a new message' id='TextNewMessage'>";
			cc += "<input type='button' value='send' id='ButtonNewMessage' onclick='send_new_message()'>";
			//cc += "</form>";

			menu_chats.sb = csb;
			menu_chats.c = c;

			sb.innerHTML = csb;
			c.innerHTML = cc;




			BB = document.getElementById("ButtonBack");
			TSU = document.getElementById("TextSearchUser");
			BSU = document.getElementById("ButtonSearchUser");

			SR = document.getElementById("SearchResults");

			CL = document.getElementById("ChatList");

			CWH = document.getElementById("chatting_with_header");

			TK = document.getElementById("TextKey");
			BED = document.getElementById("ButtonED");

			ML = document.getElementById("MessagesList");

			BCNM = document.getElementById("ButtonCheckForNewMessage");
			TNM = document.getElementById("TextNewMessage");
			BNM = document.getElementById("ButtonNewMessage");

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
	xmlhttp.open("POST", "load_chats.php", true);
	xmlhttp.send();
}
