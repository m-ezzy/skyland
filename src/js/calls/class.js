class Calls extends Content {
	constructor(who) {
		super(who);

		this.nc;
	}
	load() {
		super.load();
	}
	async load_data() {
		super.load_data();

		//let response = await fetch("src/php/" + this.who + "/load.php", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''})
		//let result = await response.json();
	}
	async send_my_peer_id() {
		const response = await fetch("src/php/" + this.who + "/enter_my_peer_id.php", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'peer_id=' + peer.id});
		let data = await response.text();
		console.log(data);
	}
	create_new_voice_call() {
		let user_name_to_call = chats.previous[chats.current].user_name;

		const response = fetch("src/php/" + this.who + "/create_new_voice_call.php", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_name=' + user_name_to_call})
		.then((response) => response.text())
		.then((value) => {
			code = value;

			conn = peer.connect(code);
			console.log(code, peer);

			const call = peer.call(code, window.localStream); // A

		    call.on('stream', function(stream) { // B
        		window.remoteAudio.srcObject = stream; // C
        		window.remoteAudio.autoplay = true; // D
        		window.peerStream = stream; //E
        		showConnectedContent(); //F    });
    		});

			if(value == null) {
				console.log("user isn't online");
			}
		});
		//return peer_id;
	}
}




