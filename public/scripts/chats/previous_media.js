Chats.prototype.previous_media = async function(chat_id) {
	this.last_known = 0

	let data = await fetch_data(`chats/previous_media`, {chat_id: chat_id, row_up: this.previous[this.current].row_up})   //`chat_id=${chat_id}&row_up=${row_up}`
	// sessionStorage.setItem(`${this.names}_messages_${chat_id}`, JSON.stringify(Object.values(data).concat(JSON.parse(sessionStorage.getItem(`${this.names}_messages_${chat_id}`)))))

	this.previous[this.current].row_up = (data.length < configs.limit) ? 0 : data[0].media_id

	let ddd = document.getElementById(`conv_chats_${chat_id}`).innerHTML
	document.getElementById(`conv_chats_${chat_id}`).innerHTML = ''

	//let getDateObject = (s) => { return new Date(s) }
	let date1 = new Date("1970-01-01 00:00:00")

	data.forEach(d => {
		this.previous[chat_id].media[d.media_id] = d

		let date2 = new Date(d.time_sent)
		if (date2.getDate() > date1.getDate() || date2.getMonth() > date1.getMonth() || date2.getFullYear() > date1.getFullYear()) {
			date1 = date2
			let div = create_div("flex center border banner date", '', '', date2.toLocaleDateString())
			document.getElementById(`conv_${this.names}_${chat_id}`).appendChild(div)
			d['time'] = `${date2.getHours()} : ${date2.getMinutes()}`
		}
		this.add_item_media(d, false)
	})

	document.getElementById(`conv_${this.names}_${chat_id}`).innerHTML += ddd
	// document.getElementById(`media_chats_${data[data.length - 1].chat_media_id}`).scrollIntoView(false)
	document.getElementById(`conv_${this.names}_${chat_id}`).scrollTop = (innerHeight / 20) * (data.length) * 20
	this.last_known = (innerHeight / 20) * (data.length) * 20;
}
