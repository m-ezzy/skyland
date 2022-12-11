const peer = new Peer('murtaza-skyland-' + getCookie("user_id") + '', { //`${Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, 0)}` //getCookie('user_id') //undefined
	//host: "3kxygyk88v.us-west-2.awsapprunner.com", //"localhost", //"peer-server-1.herokuapp.com", //window.location.hostname, //3kxygyk88v.us-west-2.awsapprunner.com
	debug: 1,
	//proxied: true,
	//path: "/p",
	//port: 443, //window.location.port || (window.location.protocol === 'https:' ? 443 : 80), //80 //9000
	//secure: true
})
//const peer = new Peer(getCookie('user_id'));
console.log(peer)
console.log(window)
console.log(window.peer)
window.peer = peer
console.log(window)
console.log(window.peer)

peer.on("open", function () {
	console.log(`peer on open. peer.open = ${peer.open}`)
})
// new connection by someone
peer.on("connection", function(DataConnection) {
	calls.event_on_connection(DataConnection);

	conn.on("data", function(data) {
		calls.event_on_data(JSON.parse(data));
	})
	conn.on("close", function() {
		calls.event_on_connection_close(this.peer.substring(16))
	})
})
// incoming call
peer.on("call", function(MediaConnection) {
	calls.event_on_call(MediaConnection);
	
	call.on('close', function() {
		console.log(this)
		calls.event_on_call_close(this.peer.substring(16))
	})
})
peer.on('close', function() {
	console.log('peer on close')
})
peer.on('disconnected', function() {
	console.log('peer on disconnected. internet gone')
})
peer.on('error', function(err) {
	console.log(err.type, err)
})
