import { decryption } from '../../privacy'
import { create_div, create_image, create_video, create_audio, create_link, create_location } from '../../elements'

export default function({conv_id, user_id, media_id, media_type, time_sent, text}, new_media) {
	if(new_media) {
		// this.media.get(conv_id).set(media_id, d)
		this.conv[conv_id].media[media_id] = {
			// conv_id: conv_id,
			user_id: user_id,
			media_id: media_id,
			media_type: media_type,
			time_sent: time_sent,
			text: text,
		}
		if (user_id != account.current.user_id) {
			this.e.sound.mr.play()
			if(this.current != conv_id) {
				document.getElementById(`nmi_${this.names}_${conv_id}`).classList.remove('hidden')
				document.getElementById(`nmi_${this.names}_${conv_id}`).innerHTML = (Number(document.getElementById(`nmi_${this.names}_${conv_id}`).innerText) + 1)
			}
			if (document.visibilityState !== "visible") {
				this.create_notification(conv_id, media_id)
			}
		}
		if(this.current != conv_id) {return}
	}

	let date_changed = false
	//let getDateObject = (s) => { return new Date(s) }
	let date1 = this.conv[conv_id].media_down.time_sent
	let date2 = new Date(time_sent + '')
	// console.log(time_sent, 'llllll', date1, 'llllll', date1.getDate(), 'llllll', date2, 'llllll', date2.getDate())
	if (date2.getDate() != date1.getDate() || date2.getMonth() != date1.getMonth() || date2.getFullYear() != date1.getFullYear()) {
		date_changed = true
		this.conv[conv_id].media_down.time_sent = date2
		let date = create_div("flex center border banner date", '', '', date2.toLocaleDateString())
		this.e.l.media.appendChild(date)
	}

	let side = (user_id == account.current.user_id) ? 'sent' : 'received'
	let media = create_div(`border padding flex flex-dir-col row-gap ${side} item-media`, `media_${this.names}_${media_id}`, '', '')

	// console.log('user_id = ', user_id, account.current.user_id, user_id != account.current.user_id, this.conv[conv_id].media_down.user_id, ' date_changed = ', date_changed)

	if( user_id != account.current.user_id && this.names != 'chats' && (user_id != this.conv[conv_id].media_down.user_id || date_changed) ) {
		// let classes = `${(side == 'sent' ? 'jc-fe' : '')}`   ${classes}
		let user = this.conv[conv_id].members[user_id]
		if(user == undefined) {
			user = {title: 'LEFT CONV', member_type: 3}
		}
		let sender = create_div(`border-b padding-b flex col-gap center-y sender_specifier`, "", "", user.title)

		if(this.names == 'channels') {
			let member_types = ['', 'founder', 'manager', 'regular']
			let member_type = user.member_type
			let desig = create_div(`border flex center designation bg-${member_types[member_type]} desig_${user_id}`, '', '', member_types[member_type])
			sender.appendChild(desig)
		}
		media.appendChild(sender)
	}

	let e = {}
	let src = `/data/${this.names}/${media_id}.${text}`
	switch (media_type) {
		case "message": {
			let message = text
			if(['chats', 'groups'].includes(this.names)) {
				// check if encrytion decrytion is on from toggle button
				// if(user_id != account.current.user_id) {
					message = decryption(text, this.keys.get(conv_id)) //this.e.t.key.value
					// decrypted_message = (user_id == account.current.user_id) ? text : decryption(text, this.e.t.key.value)
				// }
			}
			e = create_div(media_type, '', '', message)
			break
		}
		case "image": {
			e = create_image(media_type, '', '', src)
			break
		}
		case "video": {
			e = create_video(media_type, '', '', src, text)
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
			e = create_location(media_type, '', text)
			break
		}
	}

	let time_tag = create_div("border-t padding-t flex time", "", "", `${(date2.getHours().toString().length == 1 ? 0 : '')}${date2.getHours()} : ${(date2.getMinutes().toString().length == 1 ? 0 : '')}${date2.getMinutes()}`)

	media.appendChild(e)
	media.appendChild(time_tag)
	this.e.l.media.appendChild(media)

	document.getElementById(`media_${this.names}_${media_id}`).scrollIntoView({behavior: 'smooth', block: 'end'})
	// document.getElementById(`conv_chats_${chat_id}`).scrollBy(0, 500);
	this.e.l.media.scrollTop += 100
	/*this.conv[this.current].conversation.scrollBottom();
	/*this.conv[this.current].conversation.scrollTo(0,500);
	(last div tag in message list).scrollIntoView();*/

	if(media_id > this.conv[conv_id].media_down.media_id) {
		this.conv[conv_id].media_down = { media_id: media_id, user_id: user_id, time_sent: date2 }
	}
}
