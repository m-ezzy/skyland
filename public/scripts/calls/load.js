Calls.prototype.load = async function() {
	get_stream_local_audio();
	get_stream_local_video();

	let response = await fetch(backEnd.pre + 'calls/load' + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
	let data = await response.json();
	console.log(data);

	this.previous = data.json;
	this.element.innerHTML = data.html;

	await this.initialize();

	data.json.forEach(d => {
		this.add_to_previous(d);
	});
}
