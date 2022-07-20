function display_chats(t) {
	if (!chats) {
		chats = new Chats('chats');

		//check_for_new_media();
		if (resources) {
			cfnm = setInterval(check_for_new_media, 5000);
		}
	}
	chats.menu_clicked();
}
function check_for_new_media() {
	chats.check_for_new_media();
}
