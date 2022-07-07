function load_common() {
	common_loaded = 1;

	let c;

	c = "<div class='button' id='button_back' onclick='search_results_hidden()'> back </div>";
	c += "<input type='text' placeholder='type here to search' class='text' id='text_search' onfocus='search_results_visible()'>";
	c += "<div class='button' id='button_search' onclick='search_user()'> search </div>";

	c += "<div id='search_results'></div>";
	c += "<div id='chat_list'></div>";

	c += "<div id='current_header'></div>";

	c += "<div id='messages_list'></div>";

	c += "<div class='sending'>";
	c += "<div class='button close_sending' onclick='close_images()'> + </div>";
	c += "<input type='file' name='select_images' id='select_images' accept='.jpg, .jpeg, .png'>";
	c += "<div class='button send' onclick='send_images()'> send </div>";
	c += "</div>";

	c += "<div class='sending'>";
	c += "<div class='button' class='close_sending' onclick='close_videos()'> + </div>";
	c += "<input type='file' name='select_videos' id='select_videos'>";
	c += "<div class='button send' onclick='send_videos()'> send </div>";
	c += "</div>";

	c += "<div class='sending'>";
	c += "<div class='button' class='close_sending' onclick='close_audios()'> + </div>";
	c += "<input type='file' name='select_audios' id='select_audios'>";
	c += "<div class='button send' onclick='send_audios()'> send </div>";
	c += "</div>";

	c += "<div class='sending'>";
	c += "<div class='button' class='close_sending' onclick='close_documents()'> + </div>";
	c += "<input type='file' name='select_documents' id='select_documents'>";
	c += "<div class='button send' onclick='send_documents()'> send </div>";
	c += "</div>";

	c += "<div class='sending'>";
	c += "<div class='button' class='close_sending' onclick='close_location()'> + </div>";
	c += "<input type='file' name='select_location' id='select_location'>";
	c += "<div class='button send' onclick='send_location()'> send </div>";
	c += "</div>";

	c += "<div id='send_new_media'>";

	//c += "<label for='file'> image </label>";

	c += "<div class='button' id='button_images' onclick='select_images()'> images </div>";
	c += "<div class='button' id='button_videos' onclick='select_videos()'> videos </div>";
	c += "<div class='button' id='button_audios' onclick='select_audios()'> audios </div>";
	c += "<div class='button' id='button_documents' onclick='select_documents()'> documents </div>";
	c += "<div class='button' id='button_location' onclick='select_location()'> location </div>";

	c += "<input class='text' id='text_new_message' type='text' placeholder='type a new message' onfocus='add_enter_event()' onblur='remove_enter_event()'>";
	c += "<div class='button' id='button_new_message' onclick='send_new_message()'> send </div>";

	c += "</div>";

	CO.innerHTML = c;

	BB = document.getElementById("button_back");
	TS = document.getElementById("text_search");
	BS = document.getElementById("button_search");

	SR = document.getElementById("search_results");
	CL = document.getElementById("chat_list");

	CH = document.getElementById("current_header");

	ML = document.getElementById("messages_list");

	SNM = document.getElementById("send_new_media");

	TNM = document.getElementById("text_new_message");
	BNM = document.getElementById("button_new_message");

	buttons = document.getElementsByClassName("button");

	/*document.getElementById("text_search_user").addEventListener("focus", search_results_visible);*/
	/*
	if(resources) {
		//TSU.setAttribute(onkeyup:'SearchUser(this.value)');
		//don't know this works or not
		//alternatively i can simply add event listener
		TS.addEventListener("keyup",function(e) {
		search_user_or_groups();
		});
	}*/
}
function search_results_hidden() {
	console.log("10000");
	SR.style.visibility = "hidden";
	do_amazing_animation("10vw", "0vh", "5vw", "10vh");
}
function search_results_visible() {
	console.log("100");
	console.log(SR);

	//document.getElementById("search_results").style.visibility = "visible";
	SR.style.visibility = "visible";
}
