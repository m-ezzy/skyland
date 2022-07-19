function load_groups(t) {
	if (!groups) {
		groups = new Groups('groups');
	}
	if (groups.element.style.visibility == "visible") {
		return;
	}
	if (Content.current) {
		Content.current.sr.style.visibility = 'hidden';
		Content.current.conversation[Content.current.current].style.visibility = 'hidden';
		Content.current.element.style.visibility = 'hidden';
	}
	Content.current = groups;
	groups.element.style.visibility = "visible";
}