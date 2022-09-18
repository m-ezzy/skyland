Calls.prototype.send_my_peer_id = async function(peer_id) {
	const response = await fetch(backEnd.pre + 'calls/send_my_peer_id' + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'peer_id=' + peer_id});
	let data = await response.json();
	console.log(data);
}
