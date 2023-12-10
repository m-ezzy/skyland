import do_mic_off from "../actions/do_mic_off"

export default function(data) {
	console.log(data)

	switch (data.purpose) {
		case "mic": {
			if(this.current && this.current.conv_id == data.conv_id) {
				do_mic_off.call(this, data.user_id, data.state)
			}
			break
		}
		case "canvas": {
			break
		}
	}
}
