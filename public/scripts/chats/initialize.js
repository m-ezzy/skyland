Chats.prototype.initialize2 = async function() {
	console.trace(this)
	console.log("chats")
	console.log(this)
	console.log(Object.getPrototypeOf(this))
	console.log(Object.getPrototypeOf(Object.getPrototypeOf(this)))
	//console.log(this.__proto__)
	//console.log(Object.getPrototypeOf(this).initialize)
	//await Object.getPrototypeOf(this).initialize()
	//await this.super.initialize();
	//await Object.getPrototypeOf(this).initialize.call()
	//await Object.getPrototypeOf(this).prototype.initialize.call(this)
	await Duo.prototype.initialize()
}
