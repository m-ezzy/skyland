import { create_div } from "../tools"

export default function(conv_id) {
	let div = create_div("hidden padding grid row-gap list media", `conv_${this.names}_${conv_id}`, '', '')
	div.setAttribute("onscroll", `${this.names}.handle_scroll_conv(${conv_id})`)
	this.e.l.conv.appendChild(div)
	// document.getElementsByClassName("content chats")[0].getElementsByClassName("bar conversation")[0].appendChild(e)
	// this.conv.push(this.cb.appendChild(e))
	/*
	let Conv = function() {
		return (
			<div className="conv" id={`conv_chats_${chat_id}`} onscroll={`chats.handle_scroll_conv(${chat_id})`}></div>
		)
	}
	console.log(Conv)
	await ReactDOM.render(<Conv />, this.barc)
	*/
}
