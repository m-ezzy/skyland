class Groups extends ChatsGroups {
	constructor(who) {
		super(who);

		this.tam;
		this.bam;

		/*let c = "<input type='text' class='text key' placeholder='enter key of this conversation' value='0' oninput='" + this.who + ".show_decrypted_media()'>";
		c += "<div class='button key' onclick='" + this.who + ".e_d()'> encrypt or decrypt </div>";*/

		let e;
		e = create_input_text('text add_member', '', '', '');
		this.element.appendChild(e);
		e = create_div('button add_member', '', this.who + '.add_member()', 'add member');
		this.element.appendChild(e);
	}
	async search() {
		if(this.ts.value == "") {
			return;
		}
		//search_results_visible();
	
		do_amazing_animation("35vw", "0vh", "5vw", "10vh");
	
		const response = await fetch("src/php/" + this.who + "/search.php?q=" + this.ts.value, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let data = await response.json();

		this.sr.innerHTML = data;
	}
	async send_request_to_join(group_name) {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				search_results_hidden();
			}
		};
		xhr.open("POST", "../php/" + this.who + "/send_request_to_join.php?q=" + group_name, true);
		xhr.send();
	}
	async show_conversation(t, group_name) {
		super(t, group_name);

		do_amazing_animation("10vw", "10vh", "30vw", "10vh");

		this.ch.getElementByTagName('div')[0].innerHTML += " : ";

		const response = await fetch("src/php/" + this.who + "/get_members.php?q=" + group_name, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let data = await response.json();

		let r = '';
		data.forEach(d => {
			r += (d.members + " , ");
		});
		this.ch.getElementByTagName('div')[0].innerHTML += r;
	}
	async add_member() {
		do_amazing_animation("90vw", "0vh", "10vw", "10vh");

		const response = await fetch("src/php/" + this.who + "/add_members.php?gn=" + group_name + "&au=" + tam.value, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let data = await response.text();

		this.ch.getElementsByTagName('div')[0].innerHTML += tam.value + " , ";
	}
}
