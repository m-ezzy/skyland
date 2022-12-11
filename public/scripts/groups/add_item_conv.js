Groups.prototype.add_item_conv = function(group_id) {
	let e = create_div("list media", `conv_${this.names}_${group_id}`, '', '');
	e.setAttribute("onscroll", `${this.names}.handle_scroll_conv(${group_id})`);
	//document.getElementsByClassName("content groups")[0].getElementsByClassName("bar conversation")[0].appendChild(e);
	this.lc.appendChild(e);
	//this.conv.push(this.cb.appendChild(conv));
}
