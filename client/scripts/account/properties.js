import Content from '../content/properties.js'

export default class Account extends Content {   //settings //accounts
	constructor(...args) {
		super(...args)
		this.names = 'account'
	}
	initialize() {
    super.initialize()

		this.ipp = this.e.content.getElementsByClassName('image pp')[0];
		this.fpp = this.e.content.getElementsByClassName('file pp')[0];
		this.bpp = this.e.content.getElementsByClassName('button pp')[0];
  }
}
