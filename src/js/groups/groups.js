function take_to_that_group(t, group_name) {
	//CL.innerHTML = CLinnerHTML;
	SR.style.visibility = "hidden";
	//SR.innerHTML = "";

	show_messages_groups(t, group_name);
}
function create_new_group() {
	//let nd = document.createElement('div');
	//gl.append(nd);

	//gl.append(create_div_tag('groups_list_div', NULL, NULL));

	let group_name = TS.value;

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//gl.innerHTML += "<div onclick='show_messages_groups(this, " + group_name + ")'>";
			
			search_results_hidden();
			
			CL.innerHTML += this.responseText;

			//show_messages_groups(group_name);
		}
	};
	xhr.open("POST", "../php/groups/create_new_group.php?q=" + group_name, true);
	xhr.send();
}











