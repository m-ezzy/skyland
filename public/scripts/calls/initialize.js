Calls.prototype.initialize = async function() {
	this.bl = this.element.getElementsByClassName('bar list')[0];
	this.bb = this.element.getElementsByClassName('button back')[0];
	this.ts = this.element.getElementsByClassName('text search')[0];
	this.bs = this.element.getElementsByClassName('button search')[0];

    this.ls = this.element.getElementsByClassName('list search')[0];
	this.lp = this.element.getElementsByClassName('list previous')[0];

	this.bc = this.element.getElementsByClassName('bar conversation')[0];
	this.ch = this.element.getElementsByClassName("current_header")[0];

	this.conv = this.element.getElementsByClassName("conv")[0];
	this.ar = this.element.getElementsByClassName('audio remote')[0];
	this.vl = this.element.getElementsByClassName('video local')[0];
	this.vr = this.element.getElementsByClassName('video remote')[0];

	this.bca = this.element.getElementsByClassName('button call_accept')[0];
	this.bcd = this.element.getElementsByClassName('button call_decline')[0];
	this.bce = this.element.getElementsByClassName('button call_end')[0];
}
