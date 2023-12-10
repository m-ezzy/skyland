import { fetch_data } from '../../clients/api-client'
import { socket } from '../../clients/socket-client'
import { conv_name, title, icon_size } from '../../validations'

export default async function() {
	let conv_id = this.current
	let conv_name_new = this.e.info.cn.value
	let title_new = this.e.info.t.value
	let extension = null
	let s = ''

	if (this.conv[conv_id].conv_name != conv_name_new && (await conv_name(conv_name_new, this.names)).includes(false) == false ) {
		s += `${this.name}_name='${conv_name_new}'`
	} else {
		conv_name_new = null
	}
	if (this.conv[conv_id].title != title_new && title(title_new).includes(false) == false ) {
		s += `${(s == '' ? '' : ',')}title='${title_new}'`
	} else {
		title_new = null
	}
	if (s != '') {
		let status = fetch_data(`/${this.names}/update/info`, {conv_id: conv_id, 'o': s})
	}
	if (this.e.f.icon.files.length != 0 && icon_size(this.e.f.icon.files[0].size)) {
		extension = this.e.f.icon.value.substring(this.e.f.icon.value.lastIndexOf('.') + 1) //this.i_i_f.value.split('.')[1]
		let fd = new FormData()
		fd.append('conv_id', conv_id)
		fd.append('extension_old', this.conv[conv_id].extension)
		fd.append('file', this.e.f.icon.files[0])
		let status = await fetch_data(`/${this.names}/update/icon`, fd, true)
	}
	if(conv_name_new || title_new || extension) {
		let data = {
			conv_id: conv_id,
			conv_name: conv_name_new,
			title: title_new,
			extension: extension
		}
		socket[this.names].emit('update-info', data)
		this.update_info(data)
		this.handle_click_cancel()
		// this.current = 0
		// this.handle_click_prev(conv_id)
	}
}
