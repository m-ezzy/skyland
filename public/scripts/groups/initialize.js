Groups.prototype.initialize2 = async function() {
	//await Object.getPrototypeOf(this).initialize()
    //await this.super.initialize();
    await Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.call(this)

    this.barm = this.element.getElementsByClassName('bar members')[0];
	this.tam = this.element.getElementsByClassName('text add_member')[0];
	this.bam = this.element.getElementsByClassName('button message')[0];
}
