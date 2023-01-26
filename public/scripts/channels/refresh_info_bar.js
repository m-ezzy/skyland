Channels.prototype.refresh_info_bar = function() {
		this.bari.getElementsByClassName('profile-picture')[0].src = (this.previous[this.current].extension == null) ? this.place_holder : `data/icons/channels/${this.current}.${this.previous[this.current].extension}`
		this.bari.getElementsByClassName('channel_name')[0].value = this.previous[this.current].channel_name
		this.bari.getElementsByClassName('title')[0].value = this.previous[this.current].title

		Object.entries(this.bari.getElementsByClassName('section')).forEach(([num, e]) => {
		e.innerHTML = ''
	})
		Object.entries(this.previous[this.current].members).forEach(([user_id, v]) => {
		this.add_item_member(user_id, v)
	})
}
