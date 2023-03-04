import { isEmpty } from "../../tools"
import { fetch_data } from '../../api-client'
import { socket } from '../../socket-client'

export default async function() {
	let data = await fetch_data(`/${this.names}/previous_conv`, {})
	if (isEmpty(data.convs)) {return}
	// will use Map someday in this.conv
	// this.conv = data

	data.convs.forEach(conv => {
		if ( this.names != 'chats' || (this.names == 'chats' && conv.deleted_by != account.current.user_id) ) {
			// item should be used only for showing the data
			this.add_prev(data.last_id, conv, data.members?.[conv.conv_id]) //conv_name //trio_name //name
		}
		//sessionStorage.setItem(`chats_messages_${chat_id}`, JSON.stringify([]))
	})
	console.log(this.conv)
	// if(['groups','channels'].includes(this.names)) {
		socket[this.names].emit('join-all-my-rooms', Object.keys(this.conv))
	// }
	/* only those previous conversation will be created and loaded that the user clicks on */
}
