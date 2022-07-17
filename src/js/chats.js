
function take_to_that_chat(t, user_name) {
	chats.sr.style.visibility = "hidden";

	show_conversation(t, user_name);
}

function select_images() {
	//document.getElementById("select_images").click();
	chats.element.getElementsByClassName("select_images")[0].click();
	document.getElementsByClassName("sending")[0].style.visibility = "visible";
}
function select_videos() {
	//document.getElementById("select_videos").click();
	chats.element.getElementsByClassName("select_videos")[0].click();
	document.getElementsByClassName("sending")[1].style.visibility = "visible";
}
function select_audios() {
	//document.getElementById("select_audios").click();
	chats.element.getElementsByClassName("select_audios")[0].click();
	document.getElementsByClassName("sending")[2].style.visibility = "visible";
}
function select_documents() {
	//document.getElementById("select_documents").click();
	chats.element.getElementsByClassName("select_documents")[0].click();
	document.getElementsByClassName("sending")[3].style.visibility = "visible";
}
function select_location() {
	//document.getElementById("select_location").click();
	chats.element.getElementsByClassName("select_location")[0].click();
	document.getElementsByClassName("sending")[4].style.visibility = "visible";
}


function close_images() {
	document.getElementsByClassName("sending")[0].style.visibility = "hidden";
}
function close_videos() {
	document.getElementsByClassName("sending")[1].style.visibility = "hidden";
}
function close_audios() {
	document.getElementsByClassName("sending")[2].style.visibility = "hidden";
}
function close_documents() {
	document.getElementsByClassName("sending")[3].style.visibility = "hidden";
}
function close_location() {
	document.getElementsByClassName("sending")[4].style.visibility = "hidden";
}

function sm(e) {
	if(e.key == "Enter") {
		send_message();
	}
}
function add_enter_event() {
	document.addEventListener("keydown",sm);

	/*let chats.tm = document.getElementById("TextNewMessage");
	chats.tm.addEventListener("keydown",send_new_message);*/
}
function remove_enter_event() {
	document.removeEventListener("keydown",sm);

	/*let chats.tm = document.getElementById("TextNewMessage");
	chats.tm.removeEventListener("keydown",send_new_message);*/
}