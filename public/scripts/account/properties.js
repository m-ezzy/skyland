class Account extends Content {   //settings //accounts
	constructor(...args) {
		super(...args)
	}
	initialize() {
        super.initialize()

		this.ipp = this.element.getElementsByClassName('image pp')[0];
		this.fpp = this.element.getElementsByClassName('file pp')[0];
		this.bpp = this.element.getElementsByClassName('button pp')[0];
    }
}
