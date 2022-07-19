function load_chats(t) {
	if (!chats) {
		chats = new Chats('chats');
		
		if (resources) {
			cfnm = setInterval(check_for_new_media, 5000);
		}
	}
	if (chats.element.style.visibility == 'visible') {
		return;
	}
	if (Content.current != home) {
		Content.current.sr.style.visibility = 'hidden';
		Content.current.conversation[Content.current.current].style.visibility = 'hidden';
		Content.current.element.style.visibility = 'hidden';
	}
	Content.current = chats;
	chats.element.style.visibility = 'visible';
}
function check_for_new_media() {
	chats.check_for_new_media();
}