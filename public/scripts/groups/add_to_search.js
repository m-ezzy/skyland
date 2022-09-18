groups.add_to_search = function(oc, {group_id, group_name, title, extension}) {
	//let oc = prev_or_new == 'prev' ? 'take_to_previous : 'create_new';

	let src = ((extension == null) ? this.place_holder : `data/icons/groups/${group_id}.${extension}`);
	let text = `gid: ${group_id} , gn: ${group_name} , t: ${title}`;

	let div = create_div('prev', '', oc, text);
	let img = create_image('', '', '', src, '200', '200');
	let images = create_div('images', '', '', '');

	images.appendChild(img);
	div.appendChild(images);
	this.ls.appendChild(div);
}
