export default function(user_id, state) {
	// you have to make this work, not working right now
	console.log(user_id, state, this.is_on.mic)

	if( user_id == account.current.user_id || (state && this.is_on.mic) ) {
		this.is_on.mic = this.is_on.mic ? false : true
		document.getElementById(`media_calls_${account.current.user_id}`).muted = !(this.is_on.mic)
		this.e.b.mic.classList.toggle('mic_on')
		this.e.b.mic.classList.toggle('mic_off')
		this.e.b.mic.setAttribute('data-tooltip', `mic ${(this.is_on.mic ? 'off' : 'on')}`)
	}
	if(state) {
		console.log(Object.values(this.e.l.media.getElementsByClassName("remote media_tag")))
		Object.values(this.e.l.media.getElementsByClassName("remote media_tag")).forEach(e => {
			console.log(e.muted)
			e.muted = true
			console.log(e.muted)
		})
		console.log(document.getElementById(`media_calls_${user_id}`).muted)
		// document.getElementById(`media_calls_${user_id}`).removeAttribute('muted')
		document.getElementById(`media_calls_${user_id}`).muted = false
		console.log(document.getElementById(`media_calls_${user_id}`).muted)
	} else {
		// document.getElementById(`media_calls_${user_id}`).setAttribute('muted', true)
		document.getElementById(`media_calls_${user_id}`).muted = true
	}
}
