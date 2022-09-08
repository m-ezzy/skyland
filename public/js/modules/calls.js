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
		c += "<audio controls class='audio remote' id='stream_remote_audio' width='50%' height='auto'></audio>";

		c += "<video controls class='video local' id='stream_local_video' width='50%' height='auto' muted='true'></video>";
		c += "<video controls class='video remote' id='stream_remote_video' width='50%' height='auto'></video>";

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

			Object.keys(chats.previous).forEach(p => {
				if(r.chat_id == p) {
					o = chats.previous[p];
				}
			});

			let path;
			if(o.extension == null) {
				path = "media/images/place_holder/" + this.who + ".png";
			} else {
				path = 'data/profile_pictures/' + o.user_id + "." + o.extension;
			}

			let div = create_div('pre', '', '', `${o.user_id} ${o.user_name} ${o.first_name} ${o.last_name}`);
			let img = create_image('', '', '', path);

			let in_or_out = (r.called_by == me.user_id) ? 'call_made' : 'call_received';
			let call_type = (r.call_type == 6) ? 'audio' : 'video';

			let in_or_out_div = create_div('called_by_indicator ' + in_or_out, '', '', '');
			let button_call = create_div(`button call ${call_type}`, '', `${this.who}.make_new_call(${r.call_type},${o.user_id},${r.chat_id})`, '');

			div.appendChild(img);
			div.appendChild(in_or_out_div);
			div.appendChild(button_call);
			this.pl.appendChild(div);
		});

		this.ch.getElementsByClassName('peer_id_local')[0].innerHTML = `local peer id : ${peer.id}`;
	}
	handleClick() {
		super.handleClick();

		if (innerWidth <= screen_mobile && (call_outgoing || call_incoming)) {
			MB.style.display = 'none';
			this.pl.style.display = 'none';
			this.cb.style.display = 'grid';
		}
	}
	new_previous_entry() {
	}
	async make_new_call(type, user_id, chat_id) {
		// adding call log and getting remote peer id
		const response = await fetch(backEnd.pre + this.who + "/make_new_call" + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'type=' + type + '&user_id=' + user_id + '&chat_id=' + chat_id});
		let result = await response.json();

		console.log(result);

		peer_id_remote = result.peer_id;

		connect_peers();

		let stream = new MediaStream();
		switch (type) {
		case 6 : 
			stream = stream_local_audio;
			break;
		case 7 : 
			stream = stream_local_video;
			break;
		}

		call_outgoing = peer.call(peer_id_remote, stream, {metadata: {'user_id': getCookie('user_id'), 'call_type': type}});

		call_outgoing.on('stream', function(stream) {
			switch (type) {
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

		document.getElementById('menu_bar').getElementsByTagName('div')[0].style.animationName = 'call-indicator';
		this.ch.getElementsByClassName('details')[0].innerHTML = `remote user id : ${user_id}`;
		this.ch.getElementsByClassName('peer_id_remote')[0].innerHTML = `remote peer id : ${peer_id_remote}`;
		this.ec.style.display = 'grid';

		switch (type) {
		case 6 : 
			this.ar.autoplay = true;
			this.ar.muted = false;

			this.ar.style.display = 'grid';
			this.vl.style.display = 'none';
			this.vr.style.display = 'none';
			break;
		case 7 : 
			this.vr.autoplay = true;
			this.vr.muted = false;

			this.ar.style.display = 'none';
			this.vl.style.display = 'grid';
			this.vr.style.display = 'grid';
			break;
		}

		if (innerWidth <= screen_mobile) {
			MB.style.display = 'none';
			this.pl.style.display = 'none';
			this.cb.style.display = 'grid';
		}
	}
	incoming_new_call(call) {
		call_incoming = call;

		user_id_remote = call.metadata.user_id;
		call_type_remote = call.metadata.call_type;
		let call_type_remote_words = call.metadata.call_type == 6 ? 'audio' : 'video';

		document.getElementById('menu_bar').getElementsByTagName('div')[0].style.animationName = 'call-indicator';
		
		/*
		let o;
		for (let i = 0 ; i < Object.keys(chats.previous).length ; i++) {
			if ( chats.previous[i].user_id == call.metadata.user_id ) {
				o = chats.previous[i];
				break;
			}
		}
		//this.ch.getElementsByClassName('details')[0].innerHTML = o.user_id + " " + o.user_name + " " + o.first_name + " " + o.last_name;
		this.ch.getElementsByClassName('details')[0].innerHTML = document.getElementById('previous_chats_' + o.user_id).innerHTML;
		*/
		/*
		const notification_call = new Notification('calls', { body: `incoming ${call_type_remote_words} call from ${o.first_name} ${o.last_name}`, icon: 'media/images/bg1.jpg'});
		notification_call.addEventListener('click', () => {
			//window.open('http://localhost:8000', '_blank');
			location.href += '';
		});
		*/
		
		this.ch.getElementsByClassName('peer_id_remote')[0].innerHTML = `remote peer id : ${call.peer}`;

		this.ac.style.display = 'grid';
		this.dc.style.display = 'grid';

		switch (call.metadata.call_type) {
		case 6 : 
			this.ar.autoplay = true;
			this.ar.style.display = 'grid';
			this.vl.style.display = 'none';
			this.vr.style.display = 'none';
			break;
		case 7 : 
			this.vl.autoplay = true;
			this.vr.autoplay = true;
			this.ar.style.display = 'none';
			this.vl.style.display = 'grid';
			this.vr.style.display = 'grid';
			break;
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

		call_incoming = '';
		call_outgoing = '';

		if (this.ar.srcObject) {
			stream_remote_audio = new MediaStream();
			this.ar.srcObject = new MediaStream();
			this.ar.srcObject.autoplay = false;
			this.ar.srcObject.muted = true;
		}
		if (this.vr.srcObject) {
			stream_remote_video = new MediaStream();
			this.vr.srcObject = new MediaStream();
			this.vr.srcObject.autoplay = false;
			this.vr.srcObject.muted = true;
		}

		MB.getElementsByTagName('div')[0].style.animationName = '';
		this.ch.getElementsByClassName('peer_id_remote')[0].innerHTML = `remote peer id : none`;
		this.ec.style.display = 'none';
	}
}


