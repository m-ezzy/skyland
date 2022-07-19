function load_home(t) {
	if (!home) {
		home = new Home('home');
	}
	if (home.element.style.visibility == "visible") {
		return;
	}
	if (Content.current) {
		Content.current.open = 0;
		Content.current.sr.style.visibility = 'hidden';
		Content.current.conversation[Content.current.current].style.visibility = 'hidden';
		Content.current.element.style.visibility = 'hidden';
	}

	home.open = 1;
	Content.current = home;
	home.element.style.visibility = "visible";
}
