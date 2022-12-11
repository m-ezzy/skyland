Chats.prototype.add_item_conv = async function(chat_id) {
	let e = create_div("list media", `conv_${this.names}_${chat_id}`, "", "");
	e.setAttribute("onscroll", `${this.names}.handle_scroll_conv(${chat_id})`);
	//document.getElementsByClassName("content chats")[0].getElementsByClassName("bar conversation")[0].appendChild(e);
	this.lc.appendChild(e);
	//this.conv.push(this.cb.appendChild(e));

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
