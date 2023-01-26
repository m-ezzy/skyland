Trio.prototype.add_item_media = function({conv_id, user_id, media_id, media_type, time, text}, add_sender) {
	let side = (user_id == me.user_id) ? 'sent' : 'received'
	let src = `/data/${this.names}/${media_id}.${text}`
	let classes = `border ${media_type}`

	let media = create_div(`border padding ${side} item-media`, `media_${this.names}_${media_id}`, '', '')
	let e
	let time_tag = create_div("flex time", "", "", time)

	switch (media_type) {
		case "message": {
			let decrypted_message = text
			if(['chats', 'groups'].includes(this.names)) {
				decrypted_message = (user_id == me.user_id) ? text : decryption(text, this.tk.value)
			}
			e = create_div(classes, '', '', decrypted_message)
			break
		}
		case "image": {
			e = create_image(classes, '', '', src, '', '')
			break
		}
		case "video": {
			e = create_video(classes, '', '', src, '', '')
			break
		}
		case "audio": {
			e = create_audio(classes, '', '', src)
			break
		}
		case "document": {
			e = create_div('flex col-gap' + classes, '', '', '')
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
		let title = `${this.previous[Number(conv_id)].members[user_id].first_name} ${this.previous[conv_id].members[user_id].last_name}`
		let sender = create_div("border-b sender_specifier", "", "", title)
		media.appendChild(sender)
	}
	media.appendChild(e)
	media.appendChild(time_tag)

	document.getElementById(`conv_${this.names}_${conv_id}`).appendChild(media)
	document.getElementById(`media_${this.names}_${media_id}`).scrollIntoView()
	// document.getElementById(`conv_chats_${chat_id}`).scrollBy(0, 500);
	/*this.previous[this.current].conversation.scrollBottom();
	/*this.previous[this.current].conversation.scrollTo(0,500);
	(last div tag in message list).scrollIntoView();*/
}
