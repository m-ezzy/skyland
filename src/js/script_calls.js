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

let conn;

let call_outgoing;
let call_incoming;

peer.on('open', function () {
	if (calls.loaded) {
		calls.ch.getElementsByClassName('peer_id_local')[0].innerHTML = `local peer id : ${peer.id}`;
		calls.send_my_peer_id();
	}
});

peer.on('connection', function(connection) {
	conn = connection;

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
	console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
	console.log(call);

	call_incoming = call;

	calls.ch.getElementsByClassName('peer_id_remote')[0].innerHTML = `remote peer id : ${call.peer}`;

	document.getElementById('menu_bar').getElementsByTagName('div')[0].style.animationName = 'call-indicator';
	calls.ac.style.display = 'grid';
	calls.dc.style.display = 'grid';
});

function get_stream_local_audio() {
	navigator.mediaDevices.getUserMedia({video: false, audio: true})
	.then((stream) => {
		stream_local_audio = stream;
		return stream;
	})
	.catch((err) => {
		console.error(`you got an error: ${err}`)
	});
}
function get_stream_local_video() {
	navigator.mediaDevices.getUserMedia({video: true, audio: true})
	.then((stream) => {
		stream_local_video = stream;
		return stream;
	})
	.catch((err) => {
		console.error(`you got an error: ${err}`)
	});
}

function connect_peers() {
	conn = peer.connect(peer_id_remote);
	console.log(conn);
}

