class Calls extends Content {
	constructor(who) {
		super(who);

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
		c += "<audio controls class='audio remote' id='stream_remote_audio' width='60%' height='auto'></audio>";

		c += "<video controls class='video local' id='stream_local_video' width='60%' height='auto' muted='true'></video>";
		c += "<video controls class='video remote' id='stream_remote_video' width='60%' height='auto'></video>";

		c += "<div class='accept_call' onclick='calls.accept_call()'> accept call </div>";
		c += "<div class='decline_call' onclick='calls.decline_call()'> decline call </div>";
		c += "<div class='end_call' onclick='calls.end_call()'> end call </div>";
		this.cb.innerHTML += c;

		console.log(this.ch);

		this.ar = this.cb.getElementsByClassName('audio remote')[0];
		this.vl = this.cb.getElementsByClassName('video local')[0];
		this.vr = this.cb.getElementsByClassName('video remote')[0];

		this.ac = this.cb.getElementsByClassName('accept_call')[0];
		this.dc = this.cb.getElementsByClassName('decline_call')[0];
		this.ec = this.cb.getElementsByClassName('end_call')[0];

		console.log(this.ch);

		this.ch = this.element.getElementsByClassName("current_header")[0];

		console.log(this.ch);

		get_stream_local_audio();
		get_stream_local_video();
	}
	async load_data() {
		super.load_data();

		let response = await fetch(backEnd.pre + this.who + '/load' + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: ''})
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
	}
	clicked() {
		super.clicked();

		if (innerWidth <= 400 && (call_outgoing || call_incoming)) {
			MB.style.display = 'none';
			this.pl.style.display = 'none';
			this.cb.style.display = 'grid';
		}
	}
	async create_new_call_audio(user_id, chat_id) {
		// adding call log and getting remote peer id
		const response = await fetch(backEnd.pre + this.who + "/create_new_call" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_id=' + user_id + '&chat_id=' + chat_id + '&type=6'});
		let result = await response.json();

		console.log(result);

		peer_id_remote = result.peer_id;

		connect_peers();

		call_outgoing = peer.call(peer_id_remote, stream_local_audio, {metadata: {'user_id': user_id, 'call_type': 6}});

		call_outgoing.on('stream', function(stream) {
			stream_remote_audio = stream;
			calls.ar.srcObject = stream;
		});

		document.getElementById('menu_bar').getElementsByTagName('div')[0].style.animationName = 'call-indicator';
		this.ch.getElementsByClassName('details')[0].innerHTML = `remote user id : ${user_id}`;
		this.ch.getElementsByClassName('peer_id_remote')[0].innerHTML = `remote peer id : ${peer_id_remote}`;
		this.ar.autoplay = true;
		this.ar.muted = false;
		this.ar.style.display = 'grid';
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
		const response = await fetch(backEnd.pre + this.who + "/create_new_call" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'user_id=' + user_id + '&chat_id=' + chat_id + '&type=7'});
		let result = await response.json();

		peer_id_remote = result.peer_id;

		connect_peers();

		call_outgoing = peer.call(peer_id_remote, stream_local_video, {metadata: {'user_id': user_id, 'call_type': 7}});

		call_outgoing.on('stream', function(stream) {
			stream_remote_video = stream;
			calls.vr.srcObject = stream;
		});

		document.getElementById('menu_bar').getElementsByTagName('div')[0].style.animationName = 'call-indicator';
		this.ch.getElementsByClassName('details')[0].innerHTML = `remote user id : ${user_id}`;
		this.ch.getElementsByClassName('peer_id_remote')[0].innerHTML = `remote peer id : ${peer_id_remote}`;
		this.vr.autoplay = true;
		this.vr.muted = false;
		this.ar.style.display = 'none';
		this.vl.style.display = 'grid';
		this.vr.style.display = 'grid';
		this.ec.style.display = 'grid';

		if (innerWidth <= 400) {
			MB.style.display = 'none';
			this.pl.style.display = 'none';
			this.cb.style.display = 'grid';
		}
	}
	accept_call() {
		switch (call_incoming.metadata.call_type) {
		case 6 : 
			call_incoming.answer(stream_local_audio);
			break;
		case 7 : 
			call_incoming.answer(stream_local_video);
			break;
		}
		/*
		call_incoming.on('open', function() {
			//on call open
		});
		*/
	   	call_incoming.on('stream', function(stream) {
			switch (call_incoming.metadata.call_type) {
			case 6 : 
				stream_remote_audio = stream;
				calls.ar.srcObject = stream;
				break;
			case 7 : 
				stream_remote_video = stream;
				calls.vr.srcObject = stream;
				break;
			}
		});

		this.ac.style.display = 'none';
		this.dc.style.display = 'none';
		this.ec.style.display = 'grid';
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


