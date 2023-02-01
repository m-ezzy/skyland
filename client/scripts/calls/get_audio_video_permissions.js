/*
Calls.get_audio_video_permissions = function() {
}*/
let stream_local = {
	audio: new MediaStream(),
	video: new MediaStream(),
	only_video: new MediaStream()   //audio_video //only_video
}

function get_stream_local_audio() {
	navigator.mediaDevices.getUserMedia({video: false, audio: true})
	.then((stream) => {
		stream_local.audio = stream;
		//return stream;
	})
	.catch((err) => {
		console.error(`you got an error: ${err}`)
	});
}
function get_stream_local_video() {
	navigator.mediaDevices.getUserMedia({video: true, audio: true})
	.then((stream) => {
		stream_local.video = stream;
		calls.vl.srcObject = stream_local.video;
		//return stream;
	})
	.catch((err) => {
		console.error(`you got an error: ${err}`)
	});
}
function get_stream_local_only_video() {
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
	.then((stream) => {
		stream_local.only_video = stream;
		//return stream;
	})
	.catch((err) => {
		console.error(`you got an error: ${err}`)
	});
}
