Calls.prototype.incoming_new_call = function(call) {
	console.log(call);

	this.call_incoming = call;
	this.user_id_remote = call.metadata.user_id;
	this.call_type_remote = call.metadata.call_type;
	let call_type_remote_words = (call.metadata.call_type == 6) ? "audio" : "video";

	this.menu.style.animationName = "call-indicator";
	//this.ch.getElementsByClassName("details")[0].innerHTML = `cid: ${call.metadata.chat_id} , uid: ${o.user_id} , un: ${o.user_name} , fn: ${o.first_name} , ln: ${o.last_name}`;
	this.ch.getElementsByClassName("details")[0].innerHTML = document.getElementById('prev_chats_' + call.metadata.chat_id).innerHTML;

	this.bca.style.display = 'grid';
	this.bcd.style.display = 'grid';

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
	/*
	const notification_call = new Notification('calls', { body: `incoming ${call_type_remote_words} call from ${o.first_name} ${o.last_name}`, icon: 'media/images/bg1.jpg'});
	notification_call.addEventListener('click', () => {
		//window.open('http://localhost:8000', '_blank');
		location.href += '';
	});*/
}
