export default async function(conv_id, {user_id, user_name, first_name, last_name, extension, member_type}) {
	channels.conv[data.conv_id].members[data.user.user_id] = data.user
	if (channels.current == data.conv_id) {
		this.item_member(conv_id, data.user)
	}
}
