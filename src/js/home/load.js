function display_home(t) {
	if (!home) {
		home = new Home('home');

		Content.current = home;
		home.element.style.visibility = "visible";
		return;
	}
	home.menu_clicked();
}
