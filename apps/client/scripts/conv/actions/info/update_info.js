export default function({conv_id, conv_name, title, extension}) {
	if(conv_name) {
		this.conv[conv_id].conv_name = conv_name
		if(this.current == conv_id) {
			this.update_browser_route()
		}
	}
	if(title) {
		this.conv[conv_id].title = title
	}
	if(extension) {
		this.conv[conv_id].extension = extension
	}
	this.update_item_prev(conv_id)
	if (this.current == conv_id) {
		this.update_detail()
		this.update_card()
	}
}
