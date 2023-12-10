export default function() {
	let { conv_id, conv_name, title } = this.conv[this.current]
	this.e.info.i.src = this.icon_src(conv_id)
	this.e.info.cn.value = conv_name
  this.e.info.t.value = title
	// if (this.info_conv_id != conv_id) {return}
	/*
	if(conv_name) {
		this.e.info.cn.value = conv_name
	}
	if(title) {
		this.e.info.t.value = title
	}
	if(extension) {
		this.e.info.i.src = `/data/icons/${this.names}/${conv_id}.${extension}`
	}*/
}
