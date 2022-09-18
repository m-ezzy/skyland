groups.history_conv = async function(group_id) {
	this.last_known = 0;
	let row_up = this.previous[this.current].row_up;

	let response = await fetch(backEnd.pre + 'groups/history_conv' + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: `group_id=${group_id}&row_up=${row_up}`});
	let data = await response.json();
	console.log(data);

	if ( data.length < Common.limit) {
		this.previous[this.current].row_up = 0;
		return;
	}
	this.previous[this.current].row_up = data[0].group_media_id;

	let ddd = document.getElementById(`conv_groups_${group_id}`).innerHTML;
	document.getElementById(`conv_groups_${group_id}`).innerHTML = '';

	let i = 0;
	data.forEach(d => {
		this.add_to_conv(group_id, d.sender_id, d.group_media_id, d.media_type, d.text);
		i++;
	});

	document.getElementById(`conv_groups_${group_id}`).innerHTML += ddd;
	document.getElementById(`conv_groups_${group_id}`).scrollTop = (innerHeight / 20) * i;
	this.last_known = (innerHeight / 20) * i;
}
