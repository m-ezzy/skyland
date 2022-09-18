chats.history_conv = async function(chat_id) {
	this.last_known = 0;
	let row_up = this.previous[this.current].row_up;

	let response = await fetch(backEnd.pre + 'chats/history_conv' + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: `chat_id=${chat_id}&row_up=${row_up}`});
	let data = await response.json();
	console.log(data);

	if ( data.length < Common.limit) {
		this.previous[this.current].row_up = 0;
		return;
	}
	this.previous[this.current].row_up = data[0].chat_media_id;

	let ddd = document.getElementById(`conv_chats_${chat_id}`).innerHTML;
	document.getElementById(`conv_chats_${chat_id}`).innerHTML = '';

	let i = 0;
	data.forEach(d => {
		this.add_to_conv(chat_id, d.sender_id, d.chat_media_id, d.media_type, d.text);
		i++;
	});

	document.getElementById(`conv_chats_${chat_id}`).innerHTML += ddd;
	document.getElementById(`conv_chats_${chat_id}`).scrollTop = (innerHeight / 20) * i;
	this.last_known = (innerHeight / 20) * i;
}
