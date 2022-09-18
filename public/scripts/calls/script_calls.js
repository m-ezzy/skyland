let calls = new Calls();

//`${Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, 0)}`
//undefined
//getCookie('user_id')

const peer = new Peer(`${Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, 0)}`, {
	host: "localhost", //"peer-server-1.herokuapp.com", //window.location.hostname,
	debug: 1,
	proxied: true,
	path: '/',
	port: 80, //window.location.port || (window.location.protocol === 'https:' ? 443 : 80),
	//secure: true
});

//const peer = new Peer(getCookie('user_id'));
console.log(peer);
//calls.send_my_peer_id(peer.id);

console.log(window);
console.log(window.peer);
window.peer = peer;
console.log(window);
console.log(window.peer);

let stream_local_audio = new MediaStream();
let stream_local_video = new MediaStream();

let stream_remote_audio = new MediaStream();
let stream_remote_video = new MediaStream();

let user_id_remote;

let call_type_remote;

let peer_open = 0;
peer.on('open', function () {
	peer_open = 1;
	calls.peer_id_local = peer.id;
	calls.send_my_peer_id(peer.id);
	console.log(peer.id);
});

peer.on('connection', function(connection) {
	calls.conn = connection;
	calls.peer_id_remote = calls.conn.peer;

	calls.conn.on('close', function() {
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

		menu_bar.element.getElementsByTagName('div')[0].style.animationName = '';
		calls.bce.style.display = 'none';
	});
});

// incoming call
peer.on('call', function(call) {
	console.log(call);
	calls.incoming_new_call(call);
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
