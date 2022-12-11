Channels.prototype.initialize2 = async function() {
	//await Object.getPrototypeOf(this).initialize()
	//this.initialize();
	//await Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.call(this)
	await Object.getPrototypeOf(this).initialize(this)
	//console.log(Object.getPrototypeOf(this))
	console.log("channels")
}
