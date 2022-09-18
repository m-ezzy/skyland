chats.initialize = async function() {
	this.bl = this.element.getElementsByClassName('bar list')[0];
	this.bb = this.element.getElementsByClassName('button back')[0];
	this.ts = this.element.getElementsByClassName('text search')[0];
	this.bs = this.element.getElementsByClassName('button search')[0];
	this.ls = this.element.getElementsByClassName('list search')[0];
	this.lp = this.element.getElementsByClassName('list previous')[0];

	this.bc = this.element.getElementsByClassName('bar conversation')[0];
	this.ch = this.element.getElementsByClassName('current_header')[0];
	this.bca = this.element.getElementsByClassName('button call audio')[0];
	this.bcv = this.element.getElementsByClassName('button call video')[0];
	this.tk = this.element.getElementsByClassName('text key')[0];
	this.bk = this.element.getElementsByClassName('button key')[0];
	this.btedm = this.element.getElementsByClassName('button toggle_en_de_crypt')[0];

    this.snm = this.element.getElementsByClassName('send_new_media')[0];
	this.tm = this.element.getElementsByClassName('text message')[0];
	this.bm = this.element.getElementsByClassName('button message')[0];
}
