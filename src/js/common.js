function load_common(v) {
	common_loaded = 1;

	let a;
	if(resources) {
		//TS.setAttribute(onkeyup: 'search_user(this.value)');
		//TS.addEventListener("input", function(e) { search_user(); });
		a = "oninput='search_user()'";
	}

	let c;

	c = "<div class='button back' onclick='hide_search_results()'> back </div>";
	c += "<input type='text' class='text search' placeholder='type here to search' onfocus='show_search_results()' " + a + ">";
	c += "<div class='button search' onclick='search_user()'> search </div>";

	c += "<div class='search_results'></div>";
	c += "<div class='chat_list'></div>";

	c += "<div class='current_header'></div>";

	c += "<div class='messages_list' id='messages_list'></div>";

	c += "<div class='sending'>";
	c += "<div class='button close_sending' onclick='close_images()'> + </div>";
	c += "<input type='file' name='select_images' class='select_images' accept='.jpg, .jpeg, .png'>";
	c += "<div class='button send' onclick='send_images()'> send </div>";
	c += "</div>";

	c += "<div class='sending'>";
	c += "<div class='button close_sending' onclick='close_videos()'> + </div>";
	c += "<input type='file' name='select_videos' class='select_videos'>";
	c += "<div class='button send' onclick='send_videos()'> send </div>";
	c += "</div>";

	c += "<div class='sending'>";
	c += "<div class='button close_sending' onclick='close_audios()'> + </div>";
	c += "<input type='file' name='select_audios' class='select_audios'>";
	c += "<div class='button send' onclick='send_audios()'> send </div>";
	c += "</div>";

	c += "<div class='sending'>";
	c += "<div class='button close_sending' onclick='close_documents()'> + </div>";
	c += "<input type='file' name='select_documents' class='select_documents'>";
	c += "<div class='button send' onclick='send_documents()'> send </div>";
	c += "</div>";

	c += "<div class='sending'>";
	c += "<div class='button close_sending' onclick='close_location()'> + </div>";
	c += "<input type='file' name='select_location' class='select_location'>";
	c += "<div class='button send' onclick='send_location()'> send </div>";
	c += "</div>";

	c += "<div class='send_new_media'>";

	//c += "<label for='file'> image </label>";

	c += "<div class='button images' onclick='select_images()'> images </div>";
	c += "<div class='button videos' onclick='select_videos()'> videos </div>";
	c += "<div class='button audios' onclick='select_audios()'> audios </div>";
	c += "<div class='button documents' onclick='select_documents()'> documents </div>";
	c += "<div class='button location' onclick='select_location()'> location </div>";

	c += "<input class='text message' type='text' placeholder='type a new message' onfocus='add_enter_event()' onblur='remove_enter_event()'>";
	c += "<div class='button message' onclick='send_message()'> send </div>";

	c += "</div>";

	return c;

}
function hide_search_results() {
	Menu.current.sr.style.visibility = "hidden";
	console.log("10000");
	do_amazing_animation("10vw", "0vh", "5vw", "10vh");
}
function show_search_results() {
	Menu.current.sr.style.visibility = "visible";
	console.log("100");
	//document.getElementById("search_results").style.visibility = "visible";
}




