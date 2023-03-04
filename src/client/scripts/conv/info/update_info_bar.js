import update_list_member from "./update_list_member"

export default function() {
	// let conv_id = this.current
	// this.info_conv_id = conv_id

	this.update_card()
	if(['groups', 'channels'].includes(this.names)) {
		update_list_member.call(this)
	}
}
