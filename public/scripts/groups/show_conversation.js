groups.show_conversation = function(t, group_id) {
	if ( this.current == group_id ) {
		return;
	}
	if (this.current) {
		document.getElementById(`conv_groups_${this.current}`).style.display = 'none';
	}
	this.current = group_id;

	if (innerWidth <= 400) {
		menu_bar.element.style.display = 'none';
		this.pl.style.display = 'none';
		this.bb.style.display = 'none';
		this.ts.style.display = 'none';
		this.bs.style.display = 'none';
		this.sr.style.display = 'none';
		this.cb.style.display = 'grid';
	}
	//this.nmi[this.current].style.backgroundColor = 'rgb(0, 0, 0, 0)';
	//this.nmi[this.current].innerHTML = '';

	this.ch.getElementsByClassName('details')[0].innerHTML = t.innerHTML;
	this.ch.getElementsByClassName('details')[0].removeChild(this.ch.getElementsByClassName('new_media_indicator')[0]);

	document.getElementById(`conv_groups_${group_id}`).style.display = 'grid';
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
