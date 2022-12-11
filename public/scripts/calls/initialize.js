Calls.prototype.initialize2 = async function() {
	//await Object.getPrototypeOf(this).initialize()
	//await this.super.initialize();
	await Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.call(this)

	this.conv = this.element.getElementsByClassName("conv")[0];
	this.ar = this.element.getElementsByClassName('audio remote')[0];
	this.vl = this.element.getElementsByClassName('video local')[0];
	this.vr = this.element.getElementsByClassName('video remote')[0];

	this.bca = this.element.getElementsByClassName('button call_accept')[0];
	this.bcd = this.element.getElementsByClassName('button call_decline')[0];
	this.bce = this.element.getElementsByClassName('button call_end')[0];
}
