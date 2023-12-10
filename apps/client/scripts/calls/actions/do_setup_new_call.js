// import on_call_stream from "./on_call_stream"
// import on_call_close from "./on_call_close"

export default function(user_id, call) {
	this.calls[user_id] = call

	call.on('stream', (stream) => {
		console.log('peer ----- call on stream | user_id = ', user_id, ' stream = ', stream)
		
		let c = setInterval(() => {
			if(document.getElementById(`media_calls_${user_id}`)) {
				clearInterval(c)
				console.log(user_id, document.getElementById(`media_calls_${user_id}`))
				document.getElementById(`media_calls_${user_id}`).srcObject = stream
			}
		}, 5000)
		// on_call_stream.call(this, user_id, stream)
	})
	call.on('close', (data) => {
		on_call_close.call(this, user_id)
	})
	call.on('error', (error) => {
		console.log('peer ----- call on error | error = ', error)
	})
}
