groups.load = async function() {
	if (Object.keys(this.previous).length == 0) {
		return;
	}
	Object.entries(this.previous).forEach(([group_id, v]) => {
		console.log(group_id);
		let conv = create_div('conv', `conv_groups_${group_id}`, '', '');
		conv.setAttribute('onscroll', `groups.handle_scroll_conv(${group_id})`);
		this.bc.appendChild(conv);
	});
}