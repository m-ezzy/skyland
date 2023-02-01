import { decryption } from '../privacy'
import { create_div, create_image, create_video, create_audio, create_link } from '../tools'

export default function({conv_id, user_id, media_id, media_type, time_sent, text}) {
	// this.media.get(conv_id).set(media_id, d)
	this.conv[conv_id].media[media_id] = {
		conv_id: conv_id,
		user_id: user_id,
		media_id: media_id,
		media_type: media_type,
		time_sent: time_sent,
		text: text,
	}

	if (user_id != account.current.user_id && this.current != conv_id) {
		document.getElementById(`nmi_${this.names}_${conv_id}`).innerHTML = (Number(document.getElementById(`nmi_${this.names}_${conv_id}`).innerText) + 1)
	}

	let side = (user_id == account.current.user_id) ? 'sent' : 'received'
	let src = `/data/${this.names}/${media_id}.${text}`

	//let getDateObject = (s) => { return new Date(s) }
	let date1 = this.conv[conv_id].time_down
	let date2 = new Date(time_sent + '')
	// console.log(time_sent, 'llllll', date1, 'llllll', date1.getDate(), 'llllll', date2, 'llllll', date2.getDate())
	if (date2.getDate() != date1.getDate() || date2.getMonth() != date1.getMonth() || date2.getFullYear() != date1.getFullYear()) {
		this.conv[conv_id].time_down = date2
		let date = create_div("flex center border banner date", '', '', date2.toLocaleDateString())
		document.getElementById(`conv_${this.names}_${conv_id}`).appendChild(date)
	}

	let add_sender = true
	if( this.names == 'chats' || user_id == this.conv[conv_id].last_media.user_id ) {
		add_sender = false
	}
	if(media_id > this.conv[conv_id].row_down) {
		this.conv[conv_id].row_down = media_id
	}
	if(media_id > this.conv[conv_id].last_media.media_id) {
		this.conv[conv_id].last_media = {
			media_id: media_id,
			user_id: user_id,
			time_sent: time_sent,
		}
	}

	let media = create_div(`border padding flex flex-dir-col row-gap ${side} item-media`, `media_${this.names}_${media_id}`, '', '')
	let e = {}
	let time_tag = create_div("border-t padding-t flex time", "", "", `${date2.getHours()} : ${date2.getMinutes()}`)

	switch (media_type) {
		case "message": {
			let message = text
			if(['chats', 'groups'].includes(this.names)) {
				if(user_id != account.current.user_id) {
					message = decryption(text, this.e.t.key.value)
					// decrypted_message = (user_id == account.current.user_id) ? text : decryption(text, this.e.t.key.value)
				}
			}
			e = create_div(media_type, '', '', message)
			break
		}
		case "image": {
			e = create_image(media_type, '', '', src, '', '')
			break
		}
		case "video": {
			e = create_video(media_type, '', '', src, '', '')
			break
		}
		case "audio": {
			e = create_audio(media_type, '', '', src)
			break
		}
		case "document": {
			e = create_div('flex col-gap ' + media_type, '', '', '')
			let file_name = create_div('flex center-y flex-grow-2', '', '', `${media_id}.${text}`)
			let button = create_link('button border square download', '', src, `media_${this.names}_${media_id}`)
			button.setAttribute('data-tooltip', 'download')
			e.appendChild(file_name)
			e.appendChild(button)
			break
		}
		case "location": {
			// e = create_location(classes, '', src)
			break
		}
	}
	/*if(media_type == 1) {
	} else if(media_type == 2) {
	} else if(media_type == 3) {
	} else if(media_type == 4) {
	} else if(media_type == 5) {
	} else if(media_type == 6) {
	}*/
	if(add_sender) {
		let classes = `${(side == 'sent' ? 'jc-fe' : '')}`
		let user = this.conv[conv_id].members[user_id]
		console.log(user)

		if(user == undefined) {
			user = {
				title: 'left conv',
				member_type: 3
			}
		}
		let sender = create_div(`border-b padding-b flex col-gap center-y ${classes} sender_specifier`, "", "", user.title)

		if(this.names == 'channels') {
			let member_types = ['', 'founder', 'manager', 'regular']
			let member_type = user.member_type
			let desig = create_div(`border flex center designation bg-${member_types[member_type]} desig_${user_id}`, '', '', member_types[member_type])
			sender.appendChild(desig)
		}
		media.appendChild(sender)
	}
	media.appendChild(e)
	media.appendChild(time_tag)
	document.getElementById(`conv_${this.names}_${conv_id}`).appendChild(media)

	document.getElementById(`media_${this.names}_${media_id}`).scrollIntoView({behavior: 'smooth', block: 'end'})
	// document.getElementById(`conv_chats_${chat_id}`).scrollBy(0, 500);
	/*this.conv[this.current].conversation.scrollBottom();
	/*this.conv[this.current].conversation.scrollTo(0,500);
	(last div tag in message list).scrollIntoView();*/
}
