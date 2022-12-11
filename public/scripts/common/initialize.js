Common.prototype.initialize2 = function() {
	//await Object.getPrototypeOf(this).initialize()
	//await this.super.initialize();
	//await Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.call(this)
	//await this.prototype.initialize()
	Object.getPrototypeOf(this).initialize(this)

	console.log("common");

	console.log(this)

	this.bare = this.element.getElementsByClassName('bar explore')[0];
	this.bb = this.element.getElementsByClassName('button back')[0];
	this.ts = this.element.getElementsByClassName('text search')[0];
	this.bs = this.element.getElementsByClassName('button search')[0];
	this.ls = this.element.getElementsByClassName('list search')[0];
	this.lp = this.element.getElementsByClassName('list previous')[0];

	this.barc = this.element.getElementsByClassName('bar conversation')[0];
	this.ch = this.element.getElementsByClassName('current_header')[0];
}
