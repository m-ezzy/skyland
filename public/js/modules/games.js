class Games extends Content {
	constructor(who) {
		super(who);
	}
	load() {
		//super.load();
	}
	async load_data() {
		//await super.load_data();
	}
	handleClick() {
		super.handleClick();

		Content.bb.style.display = 'none';
		Content.ts.style.display = 'none';
		Content.bs.style.display = 'none';
		Chats_Groups.snm.style.display = 'none';

		//if (num == -1) {
			socket.games.emit('start-new-game', {'chat_id': chats.current});
			//num = 0;
		//}

		interval = setInterval(running_game, 10);
	}
}
