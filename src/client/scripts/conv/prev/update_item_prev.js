export default function(conv_id) {
	let conv = this.conv[conv_id]
	document.getElementById(`prev_${this.names}_${conv_id}`).getElementsByClassName("icon")[0].src = this.icon_src(conv_id)
	document.getElementById(`prev_${this.names}_${conv_id}`).getElementsByClassName("title")[0].innerText = this.conv[conv_id].title
	document.getElementById(`prev_${this.names}_${conv_id}`).getElementsByClassName("conv_name")[0].innerText = `@${this.conv[conv_id].conv_name}`
}
