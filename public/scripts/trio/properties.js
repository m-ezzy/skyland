class Trio extends Common {
	constructor(number, name) {
		super(number, name)

		this.tm
		this.bm

		this.barm
    	this.tam
	    this.bam
		this.lm;
	}
	initialize() {
		super.initialize()

		this.tm = this.element.getElementsByClassName('text message')[0]
		this.bm = this.element.getElementsByClassName('button message')[0]

		this.barm = this.element.getElementsByClassName('bar member')[0]
    	this.tam = this.element.getElementsByClassName('text add_member')[0]
	    this.bam = this.element.getElementsByClassName('button add_member')[0]
		this.lm = this.element.getElementsByClassName('list member')[0]
	}
}
