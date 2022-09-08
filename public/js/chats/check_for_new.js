Chats.prototype.check_for_new = async function() {
	const response = await fetch(backEnd.pre + "chats/check_for_new" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
	let data = await response.json();

	for(let i=0 ; i<data.length ; i++) {
		let d = data[i];

		let img_src = ((extension == 'null') ? this.place_holder : `data/icons/chats/${d.user_id}.${d.extension}`);
    	let text = `${d.user_id} , ${d.user_name} , ${d.first_name} , ${d.last_name}`;
    	this.new_previous_entry(d.chat_id, text, img_src);
	}
}
