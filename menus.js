document.body.onload = function() {
	load_skeleton();
	load_home();
}

function load_skeleton() {
	console.log("5");
	
	let c = document.getElementById("container");
	//c.innerHTML = "";

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			c.innerHTML = this.responseText;
			console.log(c);
			console.log("99999");
		}
	};
	xmlhttp.open("POST", "load_skeleton.php", true);
	xmlhttp.send();
}

let menu_home = {
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
	let sb = document.getElementById("side_bar");
	//console.log(con);

	if(menu_home.sb == "") {
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

				menu_home.sb = result.user_name + result.first_name + result.last_name;
				//menu_home.sb += "<input type='file'>";
				menu_home.sb += "<img src='data/ProfilePictures/" + result.user_name + ".jpg'>";

				sb.innerHTML = menu_home.sb;
			}
		};
		xmlhttp.open("POST", "load_home.php", true);
		xmlhttp.send();
	} else {
		sb.innerHTML = menu_home.sb;
	}
}
function load_chats() {
	let sb = document.getElementById("side_bar");
	let c = document.getElementById("content");

	console.log("100");

	if(menu_chats.sb == "") {
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			
				console.log("101");

				let csb;

				//csb = "<form>";
				csb += "<input type='button' value='Back' id='ButtonBack' onclick='BackToChats()'>";
				csb += "<input type='text' placeholder='Type a Name to Search' id='TextSearchUser' onfocus='VisibleOnFocus()' onblur='HiddenOnBlur()'>";
				csb += "<input type='button' value='Search User' id='ButtonSearchUser' onclick='SearchUser()'>";
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

					csb += "<div class='chat' onclick='ShowMessages(" + s.user + ")'>";
					csb += s.user + " " + s.first_name + " " + s.last_name;
					csb += "<img src='data/ProfilePictures/" + s.user + ".jpg'>";
					csb += "</div>";
					//});
					i++;
				}

				csb += "</div>";

				c += "<div id='CurrentlyHeader' onclick='ShowProfile()'>";
				c += "</div>";

				c += "<input type='text' placeholder='Enter key of this conversation' id='TextKey'>";
				c += "<input type='button' value='Encrypt' id='ButtonED' onclick='ED()'>";

				c += "<div id='MessagesList'>";
				c += "Select any chat to show your messages with them here";
				c += "</div>";

				//c += "<form>";
				c += "<input type='button' value='Check For New Messages' id='ButtonCheckForNewMessages' onclick='CheckForNewMessages()'>";
				c += "<input type='text' placeholder='Type a new message' id='TextNewMessage'>";
				c += "<input type='button' value='send' id='ButtonNewMessage' onclick='SendNewMessage()'>";
				//c += "</form>";

				menu_chats.sb = csb;
				menu_chats.c = c;

				sb.innerHTML = csb;
				c.innerHTML = c;
			}
		};
		xmlhttp.open("POST", "load_chats.php", true);
		xmlhttp.send();
	} else {
		console.log("102");

		sb.innerHTML = menu_chats.sb;
	}
}
