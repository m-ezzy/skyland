Groups.prototype.previous_media = async function(group_id) {
	this.last_known = 0
	let row_up = this.previous[this.current].row_up

	let data = await fetch_data(`${this.names}/previous_media`, {group_id: group_id, row_up: row_up})
	// sessionStorage.setItem(`${this.names}_messages_${group_id}`, JSON.stringify(Object.values(data).concat(JSON.parse(sessionStorage.getItem(`${this.names}_messages_${group_id}`)))))
	// sessionStorage.getItem(this.names)

	this.previous[this.current].row_up = (data.length < configs.limit) ? 0 : data[0].media_id

	let ddd = document.getElementById(`conv_${this.names}_${group_id}`).innerHTML
	document.getElementById(`conv_${this.names}_${group_id}`).innerHTML = ''

	let date1 = new Date("1970-01-01 00:00:00")

	data.forEach(d => {
		this.previous[group_id].media[d.media_id] = d
		let date2 = new Date(d.time_sent)
		if (date2.getDate() > date1.getDate() || date2.getMonth() > date1.getMonth() || date2.getFullYear() > date1.getFullYear()) {
			date1 = date2
			let div = create_div("flex center border banner date", '', '', date2.toLocaleDateString())
			document.getElementById(`conv_${this.names}_${group_id}`).appendChild(div)
		}
		this.add_item_media({conv_id: group_id, user_id: d.user_id, media_id: d.media_id, media_type: d.media_type, text: d.text}, `${date2.getHours()} : ${date2.getMinutes()}`, true)
	})
	console.log(this.previous)

	document.getElementById(`conv_${this.names}_${group_id}`).innerHTML += ddd;
	document.getElementById(`conv_${this.names}_${group_id}`).scrollTop = (innerHeight / 20) * data.length * 20;
	this.last_known = (innerHeight / 20) * data.length
}
