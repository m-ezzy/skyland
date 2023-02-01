/*
Calls.prototype.handle_click_menu = async function() {
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

	if (innerWidth <= configs.screen.mobile && (this.call_outgoing || this.call_incoming)) {
		menu_bar.element.style.display = 'none';
		this.bl.style.display = 'none';
		this.bc.style.display = 'grid';
	}
}*/
Calls.prototype.handle_click_call = async function(call_type) {
}
