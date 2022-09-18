chats.check_for_new = async function() {
	const response = await fetch(backEnd.pre + "chats/check_for_new" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
	let data = await response.json();

	/*if (data) {
		data.forEach(d => {
			this.add_previous(d);
		});
	}*/
	for(let i=0 ; i<data.length ; i++) {
		for(let j=0 ; j<data[i].length ; j++) {
			this.add_previous(data[i][j]);
		}
	}
}
