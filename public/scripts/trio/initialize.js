Trio.prototype.initialize2 = async function() {
	//await Object.getPrototypeOf(this).initialize()
	//await this.super.initialize();
	//await Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.call(this)
	//await this.prototype.initialize()
	await Object.getPrototypeOf(this).initialize(this)

	console.log("trio");

    this.snm = this.element.getElementsByClassName('send_new_media')[0];
	this.tm = this.element.getElementsByClassName('text message')[0];
	this.bm = this.element.getElementsByClassName('button message')[0];
}
