Calls.prototype.add_item_incoming_call_groups = function(group_id, user_id, call_type) {
	let div = create_div("flex box wrapper", "item_incoming_call_chats_" + group_id, "", `${first_name} ${last_name}`);
	let accept = create_div("button box square call_accept", "", `calls.call_accept_groups(${group_id}, '${call_type}')`, "accept");
	let decline = create_div("button box square call_decline", "", `calls.call_decline("groups", ${group_id}, ${user_id})`, "decline");

	div.appendChild(accept);
	div.appendChild(decline);
	this.lic.appendChild(div);
}
