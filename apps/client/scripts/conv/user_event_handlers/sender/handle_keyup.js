import { content } from "../.."

export default function(e) {
	console.log(e, e.key, this)
	if(e.key == "Enter") {
		content.current.handle_click_send()
	}
}
