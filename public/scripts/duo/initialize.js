Duo.prototype.initialize2 = async function() {
	console.log("duo");
	//await Object.getPrototypeOf(this).initialize()
    //await this.super.initialize();
	//await Object.getPrototypeOf(this).initialize.call()
	//await Object.getPrototypeOf(this).prototype.initialize.call(this)
	await Trio.prototype.initialize()

    this.bca = this.element.getElementsByClassName('button call audio')[0]
	this.bcv = this.element.getElementsByClassName('button call video')[0]
	this.tk = this.element.getElementsByClassName('text key')[0]
	this.bk = this.element.getElementsByClassName('button key')[0]
	this.bedm = this.element.getElementsByClassName('button toggle_en_de_crypt')[0]
}
