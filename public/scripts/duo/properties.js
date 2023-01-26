class Duo extends Trio {
	constructor(number, name) {
		super(number, name)
		this.bca
		this.bcv
		this.tk
		this.encrypt_decrypt = 'decrypt'
	}
	initialize() {
		super.initialize()
		this.bca = this.element.getElementsByClassName('button call audio')[0]
		this.bcv = this.element.getElementsByClassName('button call video')[0]
		this.tk = this.element.getElementsByClassName('text key')[0]
		this.bk = this.element.getElementsByClassName('button key')[0]
	}
}
