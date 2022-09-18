//import { socket } from "../script_messaging.js";

groups.load = async function() {
	let response = await fetch(backEnd.pre + 'groups/load' + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''})
	let data = await response.json();

	this.previous = data.data;
	this.element.innerHTML = data.html;

	this.bl = this.element.getElementsByClassName('bar list')[0];
	this.bb = this.element.getElementsByClassName('button back')[0];
	this.ts = this.element.getElementsByClassName('text search')[0];
	this.bs = this.element.getElementsByClassName('button search')[0];
	this.ls = this.element.getElementsByClassName('list search')[0];
	this.lp = this.element.getElementsByClassName('list previous')[0];

	this.bc = this.element.getElementsByClassName('bar conversation')[0];
	this.ch = this.element.getElementsByClassName('current_header')[0];
	this.bca = this.element.getElementsByClassName('button call audio')[0];
	this.bcv = this.element.getElementsByClassName('button call video')[0];
	this.tk = this.element.getElementsByClassName('text key')[0];
	this.bk = this.element.getElementsByClassName('button key')[0];
	this.btedm = this.element.getElementsByClassName('button toggle_en_de_crypt')[0];

	this.snm = this.element.getElementsByClassName('send_new_media')[0];
	this.tm = this.element.getElementsByClassName('text message')[0];
	this.bm = this.element.getElementsByClassName('button message')[0];

	this.tam = this.element.getElementsByClassName('text add_member')[0];
	this.bam = this.element.getElementsByClassName('button message')[0];

	if (Object.keys(this.previous).length == 0) {
		return;
	}
	Object.entries(this.previous).forEach(([group_id, v]) => {
		console.log(group_id);
		let conv = create_div('conv', `conv_groups_${group_id}`, '', '');
		conv.setAttribute('onscroll', `groups.handle_scroll_conv(${group_id})`);
		this.bc.appendChild(conv);

		//let div = create_div("list member", `ml_groups_${group_id}`, '', '');
		//this.bc.appendChild(div);
	});

	groups.socket.emit('join-all-my-rooms', Object.keys(this.previous));

	/*
	Object.entries(result).forEach(([id, row]) => {
	//for(const row in result) {
		//const { id, text, src } = this.interprete_result_of_load_data(result[i]);

		let path = "data/icons/";
		let text = `${id} , `;
		path += "users/";
		text += `${row.user_id} , ${row.user_name} , ${row.first_name} , ${row.last_name}`;
	*/
	/*
	let testArray = ["Shirt", "Bottom", "Shoes"];
	window.sessionStorage.setItem("items", JSON.stringify(testArray));
	var storedArray = JSON.parse(sessionStorage.getItem("items"));//no brackets
	var i;
	for (i = 0; i < storedArray.length; i++) {
		alert(storedArray[i]);
	}
	*/
}