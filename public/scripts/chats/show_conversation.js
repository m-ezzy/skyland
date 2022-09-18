chats.show_conversation = function(t, chat_id) {
	if ( this.current == chat_id ) {
		return;
	}
	if (this.current) {
		document.getElementById(`conv_chats_${this.current}`).style.display = 'none';
	}
	this.current = chat_id;

	if (innerWidth <= 400) {
		menu_bar.element.style.display = 'none';
		this.bl.style.display = 'none';
		this.bc.style.display = 'grid';
	}
	//this.nmi[this.current].style.backgroundColor = 'rgb(0, 0, 0, 0)';
	//this.nmi[this.current].innerHTML = '';

	this.ch.getElementsByClassName('details')[0].innerHTML = t.innerHTML;
	this.ch.getElementsByClassName('details')[0].removeChild(this.ch.getElementsByClassName('new_media_indicator')[0]);

	document.getElementById(`conv_chats_${chat_id}`).style.display = 'grid';
	this.snm.style.display = 'grid';

	/*
	if (this.previous[this.current].row_up != -1) {
		return;
	}
	this.previous[this.current].row_up = 0;
	*/

	//do_amazing_animation('id',t.style.left, t.style.top, t.style.width);
	do_amazing_animation("10vw", "10vh", "30vw", "10vh");
}
