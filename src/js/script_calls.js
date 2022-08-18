const peer = new Peer(`${Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, 0)}`, {
	host: location.hostname,
	debug: 1,
	path: '/internet-phone',
	port: 443,
});

window.peer = peer;

let stream_local_audio = new MediaStream();
let stream_local_video = new MediaStream();

let stream_remote_audio = new MediaStream();
let stream_remote_video = new MediaStream();

let peer_id_local = peer.id;
let peer_id_remote;

let user_id_remote;

let call_type_remote;

let conn;

let call_outgoing;
let call_incoming;

peer.on('open', function () {
	send_my_peer_id();
});

peer.on('connection', function(connection) {
	conn = connection;

	peer_id_remote = conn.peer;

	conn.on('close', function() {
		if (calls.ar.srcObject) {
			calls.ar.srcObject = new MediaStream();
			calls.ar.srcObject.autoplay = false;
			calls.ar.srcObject.muted = true;
		}
		if (calls.vr.srcObject) {
			calls.vr.srcObject = new MediaStream();
			calls.vr.srcObject.autoplay = false;
			calls.vr.srcObject.muted = true;
		}

		MB.getElementsByTagName('div')[0].style.animationName = '';
		calls.ch.getElementsByClassName('peer_id_remote')[0].innerHTML = `remote peer id : none`;
		calls.ec.style.display = 'none';
	});
});

// incoming call
peer.on('call', function(call) {
	console.log(call);
	console.log(call.metadata);

	call_incoming = call;

	user_id_remote = call_incoming.metadata.user_id;
	call_type_remote = call_incoming.metadata.call_type;

	calls.ch.getElementsByClassName('details')[0].innerHTML = `remote user id : ${call_incoming.metadata.user_id}`;
	calls.ch.getElementsByClassName('peer_id_remote')[0].innerHTML = `remote peer id : ${call.peer}`;

	document.getElementById('menu_bar').getElementsByTagName('div')[0].style.animationName = 'call-indicator';

	calls.ac.style.display = 'grid';
	calls.dc.style.display = 'grid';

	switch (call_incoming.metadata.call_type) {
	case 6 : 
		calls.ar.autoplay = true;
		calls.ar.style.display = 'grid';
		calls.vl.style.display = 'none';
		calls.vr.style.display = 'none';
		break;
	case 7 : 
		calls.vl.autoplay = true;
		calls.vr.autoplay = true;
		calls.ar.style.display = 'none';
		calls.vl.style.display = 'grid';
		calls.vr.style.display = 'grid';
		break;
	}
});

function get_stream_local_audio() {
	navigator.mediaDevices.getUserMedia({video: false, audio: true})
	.then((stream) => {
		stream_local_audio = stream;
		//return stream;
	})
	.catch((err) => {
		console.error(`you got an error: ${err}`)
	});
}
function get_stream_local_video() {
	navigator.mediaDevices.getUserMedia({video: true, audio: true})
	.then((stream) => {
		stream_local_video = stream;
		calls.vl.srcObject = stream;
		calls.vl.autoplay = true;
	})
	.catch((err) => {
		console.error(`you got an error: ${err}`)
	});
}
function connect_peers() {
	conn = peer.connect(peer_id_remote);
	console.log(conn);


}
async function send_my_peer_id() {
	const response = await fetch(backEnd.pre + 'calls/send_my_peer_id' + backEnd.suf, {method: 'POST', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}, body: 'peer_id=' + peer.id});
	let data = await response.text();

	console.log(data);
}
