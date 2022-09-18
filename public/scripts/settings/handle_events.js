settings.handle_click_menu = async function(t) {
	if (this.is_open) {
		return;
	}
	this.is_open = 1;
	if (this.loaded == 0) {
		await this.load();
	}
	this.loaded = 1;

	if (Content.current) {
		Content.current.is_open = 0;
		Content.current.element.style.display = 'none';
		//Content.current.menu.style.backgroundColor = 'var(--bg)';
		menu_bar.elements[Content.current.number].style.backgroundColor = "var(--bg)";
	}
	Content.current = this;

	this.element.style.display = "grid";
	this.menu.style.backgroundColor = 'var(--menu-selected-bg)';
}
settings.handle_click_prev = async function(num) {
	this.element.getElementsByClassName("conv")[num].style.display = "grid";
}
