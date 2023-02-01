Content.prototype.initialize = function() {
    console.log("content initialize")
    // this.details = this.element.getElementsByClassName('details')[0]
    // console.log(this.details)
    // this.di = this.details.getElementsByTagName('img')[0]
    // console.log(this.di)
    // this.dt = this.details.getElementsByTagName('div')[1]
    // console.log(this.dt)
    //await Object.getPrototypeOf(this).initialize()
	//await this.super.initialize();
	//await Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.call(this)
	//await this.prototype.initialize()
	Object.getPrototypeOf(this).initialize(this)

	console.log("common");

	console.log(this)

    console.log(Object.getPrototypeOf(this))
	console.log(Object.getPrototypeOf(Object.getPrototypeOf(this)))
	//console.log(this.__proto__)
	//console.log(Object.getPrototypeOf(this).initialize)
	//await Object.getPrototypeOf(this).initialize()
	//await this.super.initialize();
	//await Object.getPrototypeOf(this).initialize.call()
	//await Object.getPrototypeOf(this).prototype.initialize.call(this)
	//Duo.prototype.initialize()
    //await Object.getPrototypeOf(this).initialize()
    //await this.super.initialize();
	//await Object.getPrototypeOf(this).initialize.call()
	//await Object.getPrototypeOf(this).prototype.initialize.call(this)
	//Trio.prototype.initialize()

    	//await Object.getPrototypeOf(this).initialize()
  //await this.super.initialize()
  
  Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.call(this)
}
