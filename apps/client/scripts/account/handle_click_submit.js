import { fetch_data } from '../clients/api-client'
import { socket } from "../clients/socket-client"
import do_toggle_update from "./do_toggle_update"
import update_view_info from "./update_view_info"

import { conv_name, title, first_last_name, pass_word, icon_size } from '../validations'

export default async function() {
	let s = ''
	let extension = null

	let data = {}

	let a = {
		user_name: [this.e.t.un.value, this.all.user_name, conv_name],
		first_name: [this.e.t.fn.value, this.all.first_name, first_last_name],
		last_name: [this.e.t.ln.value, this.all.last_name, first_last_name],
		e_mail: [this.e.t.em.value, this.all.e_mail],
		mobile: [this.e.t.m.value, this.all.mobile],
		pass_word: [this.e.t.pw.value, this.all.pass_word, pass_word],
	}
	Object.entries(a).forEach(([field, values]) => {
		if(field == 'pass_word')
			console.log(pass_word, this.e.t.pw.value, pass_word(this.e.t.pw.value), values[2](values[0]))

		if(values[1] && values[0] != values[1] && (values[2](values[0]).includes(false) == false) ) {
			if(s != '') {
				s += ','
			}
			s += `${field}='${values[0]}'`
			this.all[field] = values[0]
		}
	})
	if (s != '') {
		let status = fetch_data(`/users/update/info`, {'s': s})
	}
	if (this.e.f.icon.files.length != 0 && icon_size(this.e.f.icon.files[0].size)) {
		extension = this.e.f.icon.value.substring(this.e.f.icon.value.lastIndexOf('.') + 1) //this.i_i_f.value.split('.')[1]
		let fd = new FormData()
		fd.append('extension_old', this.all.extension)
		fd.append('file', this.e.f.icon.files[0])
		let status = await fetch_data(`/users/update/icon`, fd, true)
		this.all.extension = extension
	}
	if(s != '' || extension) {
		socket['chats'].emit('update-info', data)
		do_toggle_update.call(this)
		update_view_info.call(this)
	}
}
