//import { socket } from "../script_messaging.js";

chats.load = async function() {
	let response = await fetch(backEnd.pre + 'chats/load' + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
	let data = await response.json();

	this.previous = data.data;
	this.element.innerHTML = data.html;

	await this.initialize();

	if (Object.keys(this.previous).length == 0) {
		return;
	}
	Object.entries(this.previous).forEach(([chat_id, v]) => {
		let conv = create_div('conv', `conv_chats_${chat_id}`, '', '');
		conv.setAttribute('onscroll', `chats.handle_scroll_conv(${chat_id})`);
		this.bc.appendChild(conv);
	});

	chats.socket.emit('join-all-my-rooms', Object.keys(chats.previous));

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