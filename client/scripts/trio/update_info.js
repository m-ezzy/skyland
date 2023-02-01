export default function({conv_id, conv_name, title, extension}) {
	if(conv_name) {
		this.conv[conv_id].conv_name = conv_name
		document.getElementById(`prev_${this.names}_${conv_id}`).getElementsByClassName("conv_name")[0].innerText = '@' + conv_name
		if(this.current == conv_id) {
			this.e.detail.cn.innerText = `@${conv_name}`
			this.e.info.cn.value = conv_name
			history.replaceState('', '', `/${this.names}/${conv_name}${(this.info_is_open ? '/info' : '')}`)
		}
	}
	if(title) {
		this.conv[conv_id].title = title
		document.getElementById(`prev_${this.names}_${conv_id}`).getElementsByClassName("title")[0].innerText = title
		if(this.current == conv_id) {
			this.e.detail.t.innerText = title
			this.e.info.t.value = title
		}
	}
	if(extension) {
		console.log(extension)
		this.conv[conv_id].extension = extension
		let src = `/data/icons/${this.names}/${conv_id}.${extension}`
		document.getElementById(`prev_${this.names}_${conv_id}`).getElementsByClassName("icon")[0].src = ''
		document.getElementById(`prev_${this.names}_${conv_id}`).getElementsByClassName("icon")[0].src = src
		if(this.current == conv_id) {
			this.e.detail.i.src = ''
			this.e.info.i.src = ''
			this.e.detail.i.src = src
			this.e.info.i.src = src
		}
	}
}
