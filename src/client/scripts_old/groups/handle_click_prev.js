import handle_click_prev from '../trio/handle_click_prev'

export default async function(conv_id) {
	// this.prototype.handle_click_prev(conv_id)
	console.log(Object.getPrototypeOf(this))
	// console.log(Object.getPrototypeOf(Object.getPrototypeOf(this)))
	// await super.handle_click_prev(conv_id)
	handle_click_prev.call(this, conv_id)

	this.e.l.mem.innerHTML = ''
	Object.entries(this.conv[conv_id].members).forEach(([user_id, v]) => {
		this.item_member(user_id, v)
	})
}
