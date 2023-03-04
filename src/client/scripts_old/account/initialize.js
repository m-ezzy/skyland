Account.prototype.initialize2 = async function() {
	console.log("account")
	console.log(Object.getPrototypeOf(this))
	console.log(Object.getPrototypeOf(Object.getPrototypeOf(this)))
	console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(this))))
	console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(this)))))
	console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(this))))))

	//await Object.getPrototypeOf(this).initialize()
	//await super.initialize();
	//await Content.prototype.initialize.call(this) // WORKING!!!!!!!!!!!!!!!!!!
	await Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.call(this) // this too is working

    this.ipp = this.element.getElementsByClassName('image pp')[0];
	this.fpp = this.element.getElementsByClassName('file pp')[0];
	this.bpp = this.element.getElementsByClassName('button pp')[0];
}
