import Trio from './trio'

export default class Duo extends Trio {
	constructor(number, name) {
		super(number, name)
		this.keys = new Map() //{} //new Map()
		this.encrypt_decrypt = 'decrypt'
	}
	initialize() {
		super.initialize()
		this.e['b']['ca'] = this.e.content.getElementsByClassName('button call audio')[0]
		this.e['b']['cv'] = this.e.content.getElementsByClassName('button call video')[0]
		this.e['b']['key'] = this.e.content.getElementsByClassName('button key')[0]
		this.e['t']['key'] = this.e.content.getElementsByClassName('text key')[0]
	}
}
