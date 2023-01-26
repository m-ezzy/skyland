Groups.prototype.handle_scroll_conv = function(group_id) {
	if (document.getElementById(`conv_groups_${group_id}`).scrollTop != 0) {return}
	if (last_known == 0) {return}
	if (this.previous[this.current].row_up <= 0) {return}
	this.previous_media(group_id)
}
