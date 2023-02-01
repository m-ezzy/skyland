import { fetch_data } from "../tools"
import { socket } from "../sockets"

export default async function() {
	let conv_id = this.current
	let conv_name = null
	let title = null
	let extension = null
	let s = ''

	if (this.conv[conv_id].conv_name != this.e.info.cn.value) {
		conv_name = this.e.info.cn.value
		s += `${this.name}_name='${conv_name}'`
	}
	if (this.conv[conv_id].title != this.e.info.t.value) {
		title = this.e.info.t.value
		s += `${(s == '' ? '' : ',')}title='${title}'`
	}
	if (s != '') {
		let status = fetch_data(`/${this.names}/update/info`, {conv_id: conv_id, 'o': s})
	}
	if (this.e.f.icon.files.length != 0) {
		console.log(this.conv[conv_id].extension, this.conv[conv_id].extension ? true : false)

		extension = this.e.f.icon.value.substring(this.e.f.icon.value.lastIndexOf('.') + 1) //this.i_i_f.value.split('.')[1]
		let fd = new FormData()
		fd.append('conv_id', conv_id)
		fd.append('extension_old', this.conv[conv_id].extension)
		fd.append('file', this.e.f.icon.files[0])
		let status = await fetch_data(`/${this.names}/update/icon`, fd, true)
	}
	if(conv_name || title || extension) {
		let data = {
			conv_id: conv_id,
			conv_name: conv_name,
			title: title,
			extension: extension
		}
		socket[this.names].emit('update-info', data)
		this.update_info(data)
		this.handle_click_cancel()
		// this.handle_click_prev(this.current)
	}
}
