groups.handle_click_button_back = function() {
	this.ls.style.display = 'none';
}
groups.handle_input_text_search = function() {
	this.ls.innerHTML = "";
	this.search_previous();
	this.search_new();
	/*
	if (pre.length == 0 && create.length == 0) {
		this.ls.appendChild(create_div('prev', '', '', 'start a new group'));
	}*/
}
groups.handle_click_button_search = function() {
	this.ls.innerHTML = "";
	this.search_previous();
	this.search_new();
}
groups.handle_click_take_to_previous = async function(t, group_id) {
	this.ls.style.display = 'none';
	this.show_conversation(t, group_id);
}
groups.handle_click_create_new = async function(...r) {
	this.ls.style.display = 'none';
	let o = await this.create_new(...r);
	await this.add_to_previous(o);
	await this.show_conversation(this.pl.lastElementChild, (Object.keys(o))[0]);
}
groups.handle_click_prev = function(t, group_id) {
	this.show_conversation(t, group_id);
	if(this.previous[this.current].row_up <= 0) { return; }
	this.history_conv(group_id);
}
groups.handle_click_header = function() {
	this.show_members();
}
groups.handle_click_add_member = async function(call_type) {
	this.add_member();
}
groups.handle_click_call = async function(call_type) {
	await calls.handle_click_menu();
	await calls.make_new_call(call_type, this.current, this.previous[this.current].user_id);
}
groups.handle_input_text_key = function() {
	groups.decrypt_messages();
}
groups.handle_scroll_conv = function(group_id) {
	if (document.getElementById(`conv_groups_${group_id}`).scrollTop != 0) { return; }
	if (last_known == 0) { return; }
	if (this.previous[this.current].row_up <= 0) { return; }
	this.history_conv(group_id);
}
groups.handle_focus_text_message = function() {
	document.addEventListener("keyup", handle_keyup_send_message);
}
groups.handle_blur_text_message = function() {
	document.removeEventListener("keyup", handle_keyup_send_message);
}
groups.handle_click_send_message = function() {
	this.send_message();
}
/*
let handle = {
	keyup: {},
};*//*
let handle_keyup_send_message = function(e) {
	if(e.key == "Enter") {
		groups.send_message();
	}
}
*/
