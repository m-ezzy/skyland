Chats.prototype.handle_scroll_conv = async function(chat_id) {
	if (document.getElementById(`conv_chats_${chat_id}`).scrollTop != 0) {return}
	if (last_known == 0) {return}
	if (this.previous[this.current].row_up <= 0) {return}
	await this.previous_media(chat_id)
}
