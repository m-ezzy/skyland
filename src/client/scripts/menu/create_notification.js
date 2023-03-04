export default async function(conv_id, media_id) {
	if (Notification.permission !== "denied") {
		let permission = await Notification.requestPermission()
		console.log(permission)
	}
	let title = `${this.names} : ${this.conv[conv_id].title}`
	let body = this.conv[conv_id].media[media_id].text
	let notification = new Notification(title, {body: body, icon: this.icon_src(conv_id)})
	notification.onclick = () => {
		window.parent.focus()
		this.handle_click_menu()
		this.handle_click_prev(conv_id)
		// window.open(`http://localhost:5173/${this.names}`)
	}
	return notification
}
