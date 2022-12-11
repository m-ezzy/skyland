Groups.prototype.history_conv = async function(group_id) {
	this.last_known = 0;
	let row_up = this.previous[this.current].row_up;

	let data = await fetchs(`${this.names}/history_conv`, {group_id: group_id, row_up: row_up})

	this.previous[this.current].row_up = (data.length < configs.limit) ? 0 : data[0].chat_media_id;

	let ddd = document.getElementById(`conv_groups_${group_id}`).innerHTML;
	document.getElementById(`conv_${this.names}_${group_id}`).innerHTML = '';

	let date1 = new Date("1970-01-01 00:00:00")

	data.forEach(d => {
		let date2 = new Date(d.time_sent)
		if (date2.getDate() > date1.getDate() || date2.getMonth() > date1.getMonth() || date2.getFullYear() > date1.getFullYear()) {
			date1 = date2
			let div = create_div("flex center border banner date", '', '', date2.toLocaleDateString())
			document.getElementById(`conv_${this.names}_${group_id}`).appendChild(div)
		}
		this.add_item_media(group_id, d.user_id, d.group_media_id, d.media_type, d.text, `${date2.getHours()} : ${date2.getMinutes()}`);
	});

	document.getElementById(`conv_${this.names}_${group_id}`).innerHTML += ddd;
	document.getElementById(`conv_${this.names}_${group_id}`).scrollTop = (innerHeight / 20) * data.length * 20;
	this.last_known = (innerHeight / 20) * data.length;
}
