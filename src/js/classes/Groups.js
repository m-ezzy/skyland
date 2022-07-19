class Groups extends ChatsGroups {
	constructor(who) {
		super(who);

		this.tam;
		this.bam;
	}
	async search() {
		if(this.ts.value == "") {
			return;
		}
		//search_results_visible();
	
		do_amazing_animation("35vw", "0vh", "5vw", "10vh");
	
		const response = await fetch("../php/" + this.who + "/search.php?q=" + this.ts.value, {method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''});
		let data = response.json();

		this.sr.innerHTML = data;
	}
}
