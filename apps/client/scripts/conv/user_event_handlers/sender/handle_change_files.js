import { fetch_data } from '../../clients/api-client'
import { socket } from '../../clients/socket-client'
import { media_file_size, media_files_length } from '../../validations'

export default async function() {
	let files = []
	for (const file of this.e.f.files.files) {
		if(media_file_size(file.size)) {
			files.push(file)
		}
		// console.log(5, file)
		if(media_files_length(files.length) == false) {break}
	}
	
	this.e.f.files.value = ''

	if(files.length == 0) {
		// this.e.mu.getElementsByClassName("validation")[0].getElementsByTagName("div")[1].classList.add("bg-red")
		setTimeout(() => {
			this.e.mu.classList.add("hidden")
			this.e.l.media.classList.remove("hidden")
		}, 2000)
		return
	}
	
	let conv_id = this.current
	// console.log(this.e.f, this.e.f.value, this.e.f.files)
	/*
	not working with array. you have to use form_data.append method
	let a = []
	for(let i = 0 ; i < this.e.f.files.files.length ; i++) {
		a[i] = await this.e.f.files.files.item(i)
	}
	*/
	let mime_types = {'image': 2, 'video': 3, 'audio': 4}
	let media_types_id = {'image': 2, 'video': 3, 'audio': 4, 'document': 5}
	let media_types = ['', 'message', 'image', 'video', 'audio', 'document', 'location']

	let details = []
	let fd = new FormData()
	fd.append('conv_id', conv_id)

	files.forEach(file => {
		// console.log(file, file.type, 1024 * 1024 * 2)
		
		let media_type = file.type.split('/')[0] //it's content-type / mime type added by the browser
		let media_type_id = mime_types[media_type] ? mime_types[media_type] : 5
		details.push(media_type_id)
    fd.append("files", file)
  })

	fd.append("details", JSON.stringify(details))

	let data = await fetch_data(`/${this.names}/send_media/files`, fd, true)

	let i = 0
	data.forEach(d => {
		let value = {
			conv_id: conv_id,
			user_id: account.current.user_id,
			media_id: d.media_id,
			// media_type: media_types[d.media_type_id],
			media_type: media_types[details[i]],
			time_sent:  new Date().toLocaleString(),
			text: d.text,
			// ...d
		}
		socket[this.names].emit('send-media', value) // this.socket.emit('send-media', d)
		this.add_media(value)
		i++
	})

	this.e.mu.classList.add("hidden")
	this.e.l.media.classList.remove("hidden")
}
