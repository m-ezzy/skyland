class Channels extends Trio {
    constructor(number, name) {
        super(number, name);

        this.tam
	    this.bam
		this.lmem
    }
    initialize() {
        super.initialize()

        this.tam = this.element.getElementsByClassName('text add_member')[0]
	    this.bam = this.element.getElementsByClassName('button add_member')[0]
		this.lmem = this.element.getElementsByClassName('list member')[0]
    }
}
