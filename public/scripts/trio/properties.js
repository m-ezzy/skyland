class Trio extends Common {
	constructor(number, name) {
		super(number, name)
	}
	initialize() {
		super.initialize()
		this.button_files = this.element.getElementsByClassName('button files')[0]
		this.input_files = this.element.getElementsByClassName('input files')[0]
		this.tm = this.element.getElementsByClassName('text textbox_message')[0]
		this.bm = this.element.getElementsByClassName('button send')[0]
    this.bari = this.element.getElementsByClassName('bar info')[0]

		this.i_i = this.bari.getElementsByClassName('image icon')[0]
		this.i_n = this.bari.getElementsByClassName('conv_name')[0]
		this.i_t = this.bari.getElementsByClassName('title')[0]
	}
}
