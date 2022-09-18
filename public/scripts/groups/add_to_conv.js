groups.add_to_conv = function(group_id, user_id, group_media_id, media_type, text) {
	console.log(user_id, getCookie('user_id'));
	let class_name = (user_id == getCookie('user_id')) ? 'sent' : 'received';
	let div = document.createElement('div');
	div.innerHTML = 'fn: ' + ((this.previous[group_id].members)[user_id]).first_name + ' ln: ' + ((this.previous[group_id].members)[user_id]).last_name;
	let m = create_div(class_name, '', '', '');
	m.appendChild(div);

	let e;

	if(media_type == 0) {
		let message = (user_id == getCookie('user_id')) ? text : decryption(text, this.tk.value);
		//e.className +=  `messages`;
		m.classList.add('messages');
		m.innerHTML += message;
	} else if(media_type == 1) {
		m.classList.add('images');
		e = create_image('', '', '', `data/groups/${group_id}/${group_media_id}.${text}`, '200', '200');
		m.appendChild(e);
	} else if(media_type == 2) {
		m.classList.add('videos');
		e = create_video('', '', '', '', '200', '200');
		m.appendChild(e);
	}

	document.getElementById(`conv_groups_${group_id}`).appendChild(m);
	document.getElementById(`conv_groups_${group_id}`).scrollBy(0, 500);
	/*this.previous[this.current].conversation.scrollBottom();
	/*this.previous[this.current].conversation.scrollTo(0,500);
	(last div tag in message list).scrollIntoView();*/

	if (this.current != group_id) {
		document.getElementById(`nmi_groups_${group_id}`).innerHTML = (Number(document.getElementById(`conv_groups_${group_id}`).innerText) + 1);
	}
}
