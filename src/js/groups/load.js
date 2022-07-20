function display_groups(t) {
	if (!groups) {
		groups = new Groups('groups');
	} else {
		groups.menu_clicked();
	}
}
