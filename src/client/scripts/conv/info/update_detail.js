//update_header //update //change //refresh //update_view //view
export default function() {
	let { conv_id, conv_name, title } = this.conv[this.current]
	/*
	if(this.names = 'chats') {
		conv_id = this.conv[conv_id].user_id
	}*/
	this.e.detail.i.src = this.icon_src(conv_id)
	this.e.detail.t.innerText = title
	this.e.detail.cn.innerText = `@${conv_name}`
}
