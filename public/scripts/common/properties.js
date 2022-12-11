class Common extends Content {
    constructor(number, name) {
        super(number, name)

        this.bare
		this.bb
		this.ts
		this.bs
		this.ls
		this.lp

		this.barc
		this.ch
		this.lc //list conv
		this.snm   //send_new_media //controller (for calls)

		this.last_known = 1 //to check if history still loading
    }
	initialize() {
		super.initialize()

		this.bare = this.element.getElementsByClassName('bar explore')[0]
		this.bb = this.element.getElementsByClassName('button back')[0]
		this.ts = this.element.getElementsByClassName('text search')[0]
		this.bs = this.element.getElementsByClassName('button search')[0]
		this.ls = this.element.getElementsByClassName('list search')[0]
		this.lp = this.element.getElementsByClassName('list previous')[0]
	
		this.barc = this.element.getElementsByClassName('bar conversation')[0]
		this.ch = this.element.getElementsByClassName('current_header')[0]
		this.lc = this.element.getElementsByClassName('list conv')[0]
		this.snm = this.element.getElementsByClassName('send_new_media')[0]
	}
	
}
