class Groups extends Duo {
	constructor(number, name) {
		super(number, name)

		this.fpp
		this.tgn
		this.tt

		this.bedit
		this.bsubmit
		this.bcancel

		this.tam
		this.bam
		this.lmem
	}
	initialize() {
		super.initialize()

		this.e_t = this.bare.getElementsByClassName("title")[0]
		
		this.i_i_b = this.bari.getElementsByClassName('icon_upload')[0]
		this.i_i_f = this.bari.getElementsByClassName('file')[0]
		
		this.b_edit = this.bari.getElementsByClassName('button edit')[0]
		this.b_submit = this.bari.getElementsByClassName('button submit')[0]
		this.b_cancel = this.bari.getElementsByClassName('button cancel')[0]

		this.tam = this.element.getElementsByClassName('text add_member')[0]
		this.bam = this.element.getElementsByClassName('button add_member')[0]
		this.lmem = this.element.getElementsByClassName('list member')[0]
	}
}
