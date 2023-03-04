import do_mic_off from "../actions/do_mic_off"

export default async function() {
	console.log(this.is_on.mic, !(this.is_on.mic), this.is_on.mic)
	// this.is_on.mic = this.is_on.mic ? false : true

	Object.entries(this.conn).forEach(([user_id, conn]) => {
		conn.send({purpose: 'mic', user_id: account.current.user_id, state: !(this.is_on.mic), conv_id: this.current.conv_id})
	})
	do_mic_off.call(this, account.current.user_id, !(this.is_on.mic))
}
