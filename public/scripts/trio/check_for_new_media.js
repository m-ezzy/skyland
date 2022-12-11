Trio.prototype.check_for_new_media = async function() {
	//send all chat's row_down in request
	let response = await fetch(`${backEnd.pre}${this.names}/check_for_new_media${backEnd.suf}`, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
	let data = await response.json();

	if (Object.keys(data).length == 0) { return; }

	Object.entries(data).forEach(([chat_id, rows]) => {
		rows.forEach(r => {
			this.add_item_media(chat_id, r);
		});
	});

	/*if (resources) {
		// set timeot not working, caused a lot of trouble
		cfnm = setTimeout(chats.check_for_new_media, 5000);
	}*/
	//});
}
