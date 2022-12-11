class Groups extends Duo {
    constructor(number, name) {
        super(number, name);

        this.bmem
        this.lmem
    }
    initialize() {
        super.initialize()

        this.bmem = this.element.getElementsByClassName("bar member")[0]
        this.lmem = this.element.getElementsByClassName("list member")[0]
    }
}
