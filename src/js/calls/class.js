class Calls extends Content {
	constructor(who) {
		super(who);
		
		this.al;
		this.ar;
		this.vl;
		this.vr;

		this.ac;
		this.dc;
		this.ec;
	}
	load() {
		super.load();

		let c;

		c = "";
		c += "<div class='peer_id_local'></div><div class='peer_id_remote'></div>";
		this.ch.innerHTML += c;

		console.log(this.ch);

		c = "";
		c += "<audio controls class='audio local' id='stream_local_audio' muted='true'></audio>";
		c += "<audio controls class='audio remote' id='stream_remote_audio'></audio>";

		c += "<video controls class='video local' id='stream_local_video' muted='true'></video>";
		c += "<video controls class='video remote' id='stream_remote_video'></video>";

		c += "<div class='accept_call' onclick='calls.accept_call()'> accept call </div>";
		c += "<div class='decline_call' onclick='calls.decline_call()'> decline call </div>";
		c += "<div class='end_call' onclick='calls.end_call()'> end call </div>";
		this.cb.innerHTML += c;

		console.log(this.ch);

		this.al = this.cb.getElementsByClassName('audio local')[0];
		this.ar = this.cb.getElementsByClassName('audio remote')[0];
		this.vl = this.cb.getElementsByClassName('video local')[0];
		this.vr = this.cb.getElementsByClassName('video remote')[0];

		this.ac = this.cb.getElementsByClassName('accept_call')[0];
		this.dc = this.cb.getElementsByClassName('decline_call')[0];
		this.ec = this.cb.getElementsByClassName('end_call')[0];

		console.log(this.ch);

		this.ch = this.element.getElementsByClassName("current_header")[0];

		console.log(this.ch);

		let stream_a = new MediaStream();
		let stream_v = new MediaStream();

		stream_a = get_stream_local_audio();
		this.al.srcObject = stream_a;
		this.al.autoplay = true;

		stream_v = get_stream_local_video();
		this.vl.srcObject = stream_v;
		this.vl.autoplay = true;

		//get_stream_local_audio();
		//get_stream_local_video();
	}
	async load_data() {
		super.load_data();

		let response = await fetch(this.who + "/load", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''})
		let result = await response.json();

		this.previous = result;

		console.log(result);

		result.forEach(r => {
			let o;

			chats.previous.forEach(p => {
				if(r.chat_id == p.chat_id) {
					o = p;
				}
			});

			let path = 'data/profile_pictures/';
			if(o.extension == null) {
				path = "media/images/place_holder/" + this.who + ".png";
			} else {
				path +=  o.user_id + "." + o.extension;
			}

			let div = create_div('pre', '', '', o.user_id + " " + o.user_name + " " + o.first_name + " " + o.last_name);
			let img = create_image('', '', '', path);

			let type = 'audio';
			if (r.type == 7) {
				type = 'video';
			}
			let button_call = create_div('button call ' + type, '', this.who + ".create_new_call_" + type + "(" + o.user_id + "," + o.chat_id + ")", '');

			div.appendChild(img);
			div.appendChild(button_call);
			this.pl.appendChild(div);
		});

		this.ch.getElementsByClassName('peer_id_local')[0].innerHTML = `local peer id : ${peer.id}`;

		this.send_my_peer_id();
	}
	clicked() {
		super.clicked();

		if (innerWidth <= 400 && (call_outgoing || call_incoming)) {
			MB.style.display = 'none';
			this.pl.style.display = 'none';
			this.cb.style.display = 'grid';
		}
	}
	async send_my_peer_id() {
		const response = await fetch(this.who + "/send_my_peer_id", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'peer_id=' + peer.id});
		let data = await response.text();

		console.log(data);
	}
	async create_new_call_audio(user_id, chat_id) {
		// adding call log and getting remote peer id
		const response = await fetch(this.who + "/create_new_call", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_id=' + user_id + '&chat_id=' + chat_id + '&type=6'});
		let result = await response.json();

		console.log(result);

		peer_id_remote = result.peer_id;

		this.ch.getElementsByClassName('peer_id_remote')[0].innerHTML = `remote peer id : ${peer_id_remote}`;

		connect_peers();

		call_outgoing = peer.call(peer_id_remote, stream_local_audio);

		call_outgoing.on('stream', function(stream) {
			calls.ar.srcObject = stream;
			calls.ar.autoplay = true;
			stream_remote_audio = stream;

			console.log('8844444488888888844444444448888888888444444444');
			console.log(calls.ar);
			console.log(calls.ar.src);
			console.log(calls.ar.srcObject);
			console.log(stream);
			console.log(stream_remote_audio);
		});

		document.getElementById('menu_bar').getElementsByTagName('div')[0].style.animationName = 'call-indicator';
		this.vl.style.display = 'none';
		this.vr.style.display = 'none';
		this.ec.style.display = 'grid';

		if (innerWidth <= 400) {
			MB.style.display = 'none';
			this.pl.style.display = 'none';
			this.cb.style.display = 'grid';
		}
	}
	async create_new_call_video(user_id, chat_id) {
		// adding call log and getting remote peer id
		const response = await fetch(this.who + "/create_new_call", {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_id=' + user_id + '&chat_id=' + chat_id + '&type=7'});
		let result = await response.json();

		peer_id_remote = result.peer_id;

		this.ch.getElementsByClassName('peer_id_remote')[0].innerHTML = `remote peer id : ${peer_id_remote}`;

		connect_peers();

		call_outgoing = peer.call(peer_id_remote, stream_local_video);

		call_outgoing.on('stream', function(stream) {
			calls.vr.srcObject = stream;
			calls.vr.autoplay = true;
			stream_remote_video = stream;
		});

		document.getElementById('menu_bar').getElementsByTagName('div')[0].style.animationName = 'call-indicator';
		this.al.style.display = 'none';
		this.ar.style.display = 'none';
		this.ec.style.display = 'grid';

		if (innerWidth <= 400) {
			this.pl.style.display = 'none';
			this.cb.style.display = 'grid';
		}
	}
	accept_call() {
		this.ac.style.display = 'none';
		this.dc.style.display = 'none';
		this.ec.style.display = 'grid';

		//call_incoming.answer(stream_local_audio);
		call_incoming.answer(stream_local_video);

	   	call_incoming.on('stream', function(stream) {
			stream_remote_audio = stream;
			stream_remote_video = stream;

			calls.ar.srcObject = stream;
			calls.vr.srcObject = stream;

			calls.ar.autoplay = true;
			calls.vr.autoplay = true;
		});
	}
	decline_call() {
		this.ac.style.display = 'none';
		this.dc.style.display = 'none';
	}
	end_call() {
		conn.close();

		console.log(conn);

		if (this.ar.srcObject) {
			this.ar.srcObject = new MediaStream();
			this.ar.srcObject.autoplay = false;
			this.ar.srcObject.muted = true;
		}
		if (this.vr.srcObject) {
			this.vr.srcObject = new MediaStream();
			this.vr.srcObject.autoplay = false;
			this.vr.srcObject.muted = true;
		}

		MB.getElementsByTagName('div')[0].style.animationName = '';
		this.ch.getElementsByClassName('peer_id_remote')[0].innerHTML = `remote peer id : none`;
		this.ec.style.display = 'none';
	}
}


